
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'

export default [{
  input: 'src/fetch-switcher.mjs',
  external: [],
  output: {
    file: 'dist/fetch-switcher.cjs',
    format: 'cjs'
  },
  plugins: []
}, {
  input: 'src/fetch-switcher.mjs',
  output: {
    file: 'dist/fetch-switcher.umd.js',
    format: 'umd',
    name: 'fetchSwitcher'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' })
  ]
}]
