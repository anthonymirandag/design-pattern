class DataBase {
  private static instance: DataBase
  private constructor(){
    console.log('Database connected')
  }
  public static getInstance(){
    if(!DataBase.instance)
    DataBase.instance = new DataBase()
    return DataBase.instance
  }
  
  query(query: string){
    console.log('Executed Query: ' + query)
  }
}

class ApplicationSearch {
  findData(){
    const dataBaseStudents =  DataBase.getInstance()
    dataBaseStudents.query('find all Students')
    
    const dataBaseTeachers = DataBase.getInstance()
    dataBaseTeachers.query('find all Teachers')
  }
}

const appSearch = new ApplicationSearch()  
appSearch.findData()