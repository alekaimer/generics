import { Db, MongoClient } from 'mongodb'

// models
class UserModel {
  id: string
  name: string
}

class MessageModel {
  id: string
  message: string
}

// repositories>
class RepositoryBase<T> {
  constructor(
    private readonly db: Db,
    private readonly collectionName: string
  ) {}

  async loadById(id: string): Promise<T | null> {
    const collection = this.db.collection(this.collectionName)
    const entity = await collection.findOne<T>({ id })
    return entity || null
  }

  async loadAll(): Promise<T[]> {
    const collection = this.db.collection(this.collectionName)
    const list = await collection.find().toArray() as T[]
    return list
  }
}

class LoginRepository extends RepositoryBase<UserModel> {}

class MessageRepository extends RepositoryBase<MessageModel> {}

// controllers
class LoginController {
  async connect() {
    return await MongoClient.connect('mongodb://localhost:27017/db')
  }

  async login() {
    const client = await this.connect()
    const repo = new LoginRepository(client.db(), 'fruit')
    const user = await repo.loadById('1337')
    console.log('> user name: ', user?.name)
  }

  async getUsersList() {
    const client = await this.connect()
    const repo = new LoginRepository(client.db(), 'fruit')
    const list = await repo.loadAll()
    console.log('> list: ', list.map((item) => item.name))
  }
}

class MessageController {
  async connect() {
    return await MongoClient.connect('mongodb://localhost:27017/db')
  }

  async getMessageById () {
    const client = await this.connect()
    const repo = new MessageRepository(client.db(), 'users')
    const message = await repo.loadById('1337')
    console.log('> message name: ', message?.message)
  }

  async getMessagesList() {
    const client = await this.connect()
    const repo = new MessageRepository(client.db(), 'users')
    const list = await repo.loadAll()
    console.log('> user list: ', list.map((user) => user.message))
  }
}
