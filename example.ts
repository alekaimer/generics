import { Db, MongoClient, Collection } from 'mongodb'

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
  readonly collection: Collection
  constructor(db: Db, collectionName: string) {
    this.collection = db.collection(collectionName)
  }

  async loadById(id: string): Promise<T | null> {
    const entity = await this.collection.findOne<T>({ id })
    return entity || null
  }

  async loadAll(): Promise<T[]> {
    const list = (await this.collection.find().toArray()) as T[]
    return list
  }
}

class UserRepository extends RepositoryBase<UserModel> {}

class MessageRepository extends RepositoryBase<MessageModel> {}

// controllers
class UserController {
  async connect() {
    return await MongoClient.connect('mongodb://localhost:27017/db')
  }

  async login() {
    const client = await this.connect()
    const repo = new UserRepository(client.db(), 'fruit')
    const user = await repo.loadById('1337')
    console.log('> user name: ', user?.name)
  }

  async getUsersList() {
    const client = await this.connect()
    const repo = new UserRepository(client.db(), 'fruit')
    const list = await repo.loadAll()
    console.log(
      '> list: ',
      list.map((item) => item.name)
    )
  }
}

class MessageController {
  async connect() {
    return await MongoClient.connect('mongodb://localhost:27017/db')
  }

  async getMessageById() {
    const client = await this.connect()
    const repo = new MessageRepository(client.db(), 'users')
    const message = await repo.loadById('1337')
    console.log('> message name: ', message?.message)
  }

  async getMessagesList() {
    const client = await this.connect()
    const repo = new MessageRepository(client.db(), 'users')
    const list = await repo.loadAll()
    console.log(
      '> user list: ',
      list.map((user) => user.message)
    )
  }
}
