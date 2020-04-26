/* import { formatFilters, hasContent } from './utils'
import { GetCandidatesByStageArgs, FilterCandidateInputType } from 'types'
import { completeInfoFiltersCandidates } from './filters'

export class CandidateAgregation {
  constructor(private query: any[] = []) {}
  addMatch(match: any) {
    this.query.push({
      $match: match
    })
  }

  addFieldConcat(field: string, concat: string[]) {
    this.query.push({
      $addFields: {
        [field]: { $concat: concat }
      }
    })
  }

  addLookup(lookup: any) {
    this.query.push(
      {
        $lookup: lookup
      }
    )
  }

  setSort(sort: any) {
    this.query.push({ $sort: sort })
  }

  setPagination(page: number,perPage: number) {
    this.query.push(...[
      {
        $skip: page * perPage
      },
      {
        $limit: perPage
      }
    ])
  }
  setCounter() {
    this.query.push({ $count: 'total' })
  }

  async execute() {
    try {
      await CandidateModel.aggregate(this.query).allowDiskUse(true)
    } catch (error) {
      console.log('CandidateAgregation -> execute -> error', error)
      throw new Error(error)
    }
  }
}

export class FiltersCandidateBuilder {
  candidateAgregation: CandidateAgregation
  baseMatch: any = {}
  jobId = ''
  constructor() {
    this.candidateAgregation = new CandidateAgregation()
  }

  setOperateBaseMatch(operator = '$and') {
    this.baseMatch[operator] = []
  }

  addStageBase(stageId: string) {
    this.baseMatch.$or.push({ stageId: stageId })
  }

  addStagesBase(stageIds: string[]) {
    this.baseMatch.$or.push({ stageId: { $in: stageIds } })
  }

  addCandidatesBase(candidateIds: string []) {
    this.baseMatch.$or.push({ _id: candidateIds })
  }

  setJobBase(jobId: string) {
    this.setOperateBaseMatch()
    this.jobId = jobId
    this.baseMatch.$and.push({ jobId: this.jobId })
  }

  setStageBase(stageId: string) {
    this.baseMatch.$and.push({ stageId: stageId })
  }

  setStagesBase(stageIds: string[]) {
    this.baseMatch.$and.push({ stageId: { $in: stageIds } })
  }

  setCandidateStatusBase(status: string[]) {
    this.baseMatch.$and.push({ status: { $in: status } })
  }

  setExcludeCandidatesBase(candidateIds: string[]) {
    this.baseMatch.$and.push({ _id: { $nin: candidateIds } })
  }

  setBaseMatch() {
    this.candidateAgregation.addMatch(this.baseMatch)
  }

  setSearch(search: string) {
    const searchBy = [ 'fullName','firstName','lastName','email','phone' ]
    this.candidateAgregation.addFieldConcat('fullName',[ '$firstName',' ','$lastName' ])
    const querySearch = searchBy.map((keySearch: string) => ({ [keySearch]: { $regex: new RegExp(search, 'i') } }))
    this.candidateAgregation.addMatch({ $or: querySearch })
  }

  setLookUpCandidteTask(jobId: string) {
    const pipeline = [
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [ '$jobId', jobId ] },
              { $eq: [ '$candidateId', '$$candidate' ] },
              { $eq: [ '$deleted', false ] }
            ]
          }
        }
      },
      {
        $project: {
          _id          : 1,
          candidateId  : 1,
          status       : 1,
          taskId       : 1,
          qualification: 1
        }
      }
    ]

    const lookup = {
      from: 'candidatetasks',
      let : { stage: '$stageId', candidate: '$candidateId' },
      pipeline,
      as  : 'candidateTask'
    }

    this.candidateAgregation.addLookup(lookup)
  }

  setFilters(filters: any) {
    this.candidateAgregation.addMatch({
      $and: formatFilters(filters)
    })
  }

  setSort(sort: any) {
    this.candidateAgregation.setSort(sort)
  }

  setPagination(page: number,perPage: number) {
    this.setPagination(page,perPage)
  }

  setCounter() {
    this.setCounter()
  }

  getCandidateAggreagtion() {
    return this.candidateAgregation
  }
}

export class DirectorFiltersCandidatesBuilder {
  constructor() {
  }

  async makeCandidatesInStage(args: GetCandidatesByStageArgs) {
    try {
      const {
        jobId ,
        stageId,
        search,
        filters,
        excludeCandidateIds
      } =  args
      const candidateFilterBuilder = new FiltersCandidateBuilder()
      candidateFilterBuilder.setJobBase(jobId)
      candidateFilterBuilder.setStageBase(stageId)
      if(excludeCandidateIds && excludeCandidateIds.length)
        candidateFilterBuilder.setExcludeCandidatesBase(excludeCandidateIds)
      // Filtros

      const optionsRelation = {
        fullName     : false,
        candidateTask: false,
        candidate    : false,
        feedback     : false
      }

      let filtersInput: FilterCandidateInputType[] = []
      if(filters && filters.length) {
        filtersInput = await completeInfoFiltersCandidates(filters, optionsRelation)
        if(optionsRelation.candidateTask) candidateFilterBuilder.setLookUpCandidteTask(jobId)
        candidateFilterBuilder.setFilters(filtersInput)
      }
      if(search && search.length)
        candidateFilterBuilder.setSearch(search)

      // set queries
      return await candidateFilters.getData()
    } catch (error) {
      throw new Error(error)
    }
  }
}
 */
/* export {} */
