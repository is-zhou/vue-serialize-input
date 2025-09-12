import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts" //将.vue或.ts(x)文件生成*.d.ts声明文件
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ command }: { command: 'serve' | 'build'; mode: string }) => {
    if (command === 'serve') {
        return {
            root: path.resolve(__dirname, 'example'),
            plugins: [vue()],
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, 'src')
                }
            }
        }
    }

    return {
        plugins: [
            vue(),
            dts(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        build: {
            lib: {
                entry: path.resolve(__dirname, 'src/index.ts'),//库入口文件
                name: "VueSerializeInput",//设置库的全局变量名称，即在浏览器中加载该库时，库将暴露一个名为 VueSerializeTextArea 的全局对象
                fileName: (format) => `vue-serialize-input.${format}.js`//指定了库文件的命名规则，format会根据不同的输出格式（如es、cjs`）生成不同的文件名
            },
            rollupOptions: {
                external: ["vue", 'element-plus'],//配置表示 vue 是一个外部依赖，它不会被打包进最终的库中，而是期望用户在使用这个库时已经加载了 Vue。
                output: {
                    globals: {
                        vue: "Vue", //告诉 Rollup，当库被打包时，vue 作为外部依赖，它的全局变量名是 Vue。这个设置是为了支持 UMD 和 IIFE 格式的输出文件。
                        'element-plus': 'ElementPlus'
                    }
                }
            }
        }
    }
})
