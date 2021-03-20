import path from 'path'

export default function (config) {
  config.plugins.push({
    name: 'root-solve',
    resolveId(spec, importer) {
      if (!spec.startsWith('public/')) return
      return path.resolve(config.cwd, spec.substring(7))
    },
  })
}
