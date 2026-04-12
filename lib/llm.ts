import fs from "fs"
import path from "path"

import { Index } from "@/registry/__index__"

export function processMdxForLLMs(content: string) {
    const componentPreviewRegex =
        /<ComponentPreview[\s\S]*?name="([^"]+)"[\s\S]*?\/>/g

    return content.replace(componentPreviewRegex, (match, name) => {
        try {
            const entry = Index[name]
            if (!entry?.files?.[0]?.path) {
                return match
            }

            const filePath = path.join(process.cwd(), entry.files[0].path)
            let source = fs.readFileSync(filePath, "utf8")

            source = source.replaceAll(
                "@/registry/new-york-v4/",
                "@/components/"
            )
            source = source.replace(/export default\b/, "export")

            return `\`\`\`tsx\n${source}\n\`\`\``
        } catch (error) {
            console.error(`Error processing ComponentPreview ${name}:`, error)
            return match
        }
    })
}
