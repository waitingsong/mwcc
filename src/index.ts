import * as fs from 'fs'
import * as path from 'path'
import MwccHost from './host'
import { MwccOptions } from './iface'
import { mergeCompilerOptions, getDefaultOptions } from './config'

export async function mwcc (projectDir: string, outputDir: string, options?: MwccOptions) {
  projectDir = path.resolve(projectDir)
  if (options == null) {
    options = {}
  }
  const defaultOptions = getDefaultOptions(projectDir, outputDir)
  const compilerOptions = mergeCompilerOptions(defaultOptions.compilerOptions, options.compilerOptions)
  options.compilerOptions = compilerOptions

  const host = new MwccHost(projectDir, options)
  const { summary, diagnostics } = await host.run()

  fs.writeFileSync(path.join(host.context.derivedOutputDir, 'midway.build.json'), JSON.stringify(summary))
  return { summary, diagnostics }
}
