import Database, { PostgreConfig } from '@ioc:Adonis/Lucid/Database'

export function getConfig(): PostgreConfig {
  const config = Database.manager.get('tenant')?.config

  if (config === undefined || !('searchPath' in config)) {
    throw 'Something went terribly wrong'
  }

  return config
}

export function getTenant(searchPath: string) {
  if (Database.manager.isConnected('tenant')) {
    const config = getConfig()

    if (config.searchPath?.[0] !== searchPath) {
      config.searchPath = [searchPath]
      Database.manager.patch('tenant', config)
      Database.manager.connect('tenant')
      // console.log(config.searchPath, ' change searchPath')
      // } else {
      //   console.log(config.searchPath, ' already connected')
    }
  } else {
    Database.manager.connect('tenant')
    const config = getConfig()
    config.searchPath = [searchPath]
    Database.manager.patch('tenant', config)

    // console.log(config.searchPath, 'connected')
  }
}
