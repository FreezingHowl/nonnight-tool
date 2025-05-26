export const changeTheme = (theme: Record<string, string>) => {
    const root = document.documentElement
    Object.keys(theme).forEach(key => {
        root.style.setProperty(`--${key}`, theme[key])
    })

    // 动态修改less变量
    const less = (window as any).less
    if (less) {
        less.modifyVars(theme)
    }
}
