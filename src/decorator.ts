// Diferencia entre herencia y agregacion
// agregacion copia los mismos metodos de un objeto y los envuelve de un objeto como suyos  
// ejecutando los metodos de esta instancia
// Sirve para agrager funcionalidad a una clase
interface DataSource {
  writeFile():void
  readFile():void
}

class FileDataSource implements DataSource {
  protected fileName :string
  constructor( fileName:string){
    this.fileName = fileName
  }
  
  writeFile(){
    console.log('Escribiendo Archivo')
  }

  readFile(){
    console.log('Leyendo Archivo')
  }
}

class DataSourceDecorator implements DataSource {
  protected wrapper : DataSource

  constructor(source: DataSource){
    this.wrapper = source
  }

  writeFile(){
    this.wrapper.writeFile()
  }

  readFile(){
    this.wrapper.readFile()
  }
}

class EncryptionDecorator extends DataSourceDecorator {
  
  writeFile(){
    console.log('Encriptando data')
    super.writeFile()
  }

  readFile(){
    console.log('Desenciptando Data')
    super.readFile()
  }
}

class CompressionDecorator extends DataSourceDecorator {
  writeFile(){
    console.log('Comprimiento file')
    super.writeFile()
  }
  readFile(){
    console.log('Descompriendo file')
    super.readFile()
  }
}

class ApplicationSaveFile {
  saveFile(fileName:string,compressFile: boolean,encryptFile: boolean){
    let source: DataSource = new FileDataSource(fileName)
    if(compressFile) 
      source = new CompressionDecorator(source)
    if(encryptFile)
      source = new EncryptionDecorator(source)
    console.log('\nEscribiendo file...\n')
    source.writeFile()
    console.log('\nLeyendo file...\n')
    source.readFile()
  }
}

const appSaveFile = new ApplicationSaveFile()
appSaveFile.saveFile('File.txt',true,true)