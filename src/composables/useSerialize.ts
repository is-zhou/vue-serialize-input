import { stringify } from "javascript-stringify"

export interface SerializeOptions {
    /**
     * 是否允许函数、正则等危险类型（默认 true）
     * - 如果 false，则会过滤掉函数，正则转为字符串
     */
    unsafe?: boolean
}

export interface UseSerialize {
    serialize: (value: unknown, options?: SerializeOptions) => string
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
    function serialize(value: unknown, options: SerializeOptions = {}): string {
        const { unsafe = true, ...rest } = options

        if (!unsafe) {
            // 过滤函数
            value = JSON.parse(JSON.stringify(value, (_, v) => {
                if (typeof v === "function") return undefined
                if (v instanceof RegExp) return v.toString()
                return v
            }))
        }

        return stringify(value) || ""
    }

    /**
     * 反序列化
     * - unsafe 模式下，允许函数/正则等被还原（使用 new Function）
     * - safe 模式下，只支持 JSON 安全值（Object, Array, String, Number 等）
     */
    function deserialize<T = unknown>(str: string, options: SerializeOptions = {}): T {
        const { unsafe = true } = options

        if (!unsafe) {
            // 安全模式 → 只用 JSON.parse
            return JSON.parse(str) as T
        }

        // 开发模式 → 允许函数/正则
        return new Function(`return (${str})`)() as T
    }

    return { serialize, deserialize }
}
