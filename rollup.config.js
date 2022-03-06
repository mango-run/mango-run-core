import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import pkg from './package.json'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: { dir: 'dist', format: 'cjs', sourcemap: true },
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      nodeResolve(),
      typescript(),
      copy({
        targets: [
          { src: 'package.json', dest: 'dist' },
          { src: 'README.md', dest: 'dist' },
        ],
      }),
    ],
  },
])
