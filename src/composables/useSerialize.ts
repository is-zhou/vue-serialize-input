import { stringify } from "javascript-stringify"
import { ToString } from "javascript-stringify/dist/types"

export interface SerializeOptions {
    /**
     * 是否允许函数、正则等危险类型（默认 true）
     * - 如果 false，则会过滤掉函数，正则转为字符串
     */
    unsafe?: boolean
    replacer?: ToString | null | undefined
    space?: number
    options?: {
        maxDepth: number
        maxValues: number
        references: boolean
        skipUndefinedProperties: boolean
    }
}

export interface UseSerialize {
    serialize: (value: unknown, options?: SerializeOptions) => string | undefined
    deserialize: <T = unknown>(str: string, options?: SerializeOptions) => T
}

/**
 * useSerialize composable
 * 支持对象、数组、正则、函数的序列化
 */
export function useSerialize(): UseSerialize {
    /**
     * 序列化
     */
    function serialize(value: unknown, serializeOptions: SerializeOptions = {}): string | undefined {
        const { unsafe = true, replacer = null, space = 2, options = undefined } = serializeOptions

        if (!unsafe) {
            value = JSON.parse(JSON.stringify(value, (_, v) => {
                if (typeof v === "function") return undefined
                if (v instanceof RegExp) return v.toString()
                return v
            }))
        }
        return stringify(value, replacer, space, options)
    }

    /**
     * 反序列化
     * - unsafe 模式下，允许函数/正则等被还原（使用 new Function）
     * - safe 模式下，只支持 JSON 安全值（Object, Array, String, Number 等）
     */
    function deserialize<T = unknown>(str: string, serializeOptions: SerializeOptions = {}): T {
        const { unsafe = true } = serializeOptions

        if (!unsafe) {
            // 安全模式 → 只用 JSON.parse
            return JSON.parse(str) as T
        }

        // 开发模式 → 允许函数/正则
        return new Function(`return (${str})`)() as T
    }

    return { serialize, deserialize }
}
