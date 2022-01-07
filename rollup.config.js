
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'

export default [{
  input: 'src/fetch-file-scheme.mjs',
  external: [],
  output: {
    file: 'dist/fetch-file-scheme.cjs',
    format: 'cjs'
  },
  plugins: []
}]
