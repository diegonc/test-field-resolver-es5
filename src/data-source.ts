import { DataSource } from 'typeorm'

let ds: DataSource | null = null

export async function initDataSource() {
  if (!ds) {
    ds = new DataSource({
      type: 'sqlite',
      database: './db.sqlite3',
      logging: true,
      synchronize: true,
      entities: [__dirname + '/modules/**/*.model.ts']
    })

    await ds.initialize()
  }

  return ds
}
