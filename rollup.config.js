
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
}, {
  input: 'src/fetch-file-scheme.mjs',
  output: {
    file: 'dist/fetch-file-scheme.umd.js',
    format: 'umd',
    name: 'fetchFileScheme'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' })
  ]
}]
