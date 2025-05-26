#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')

// 1. 创建独立仓库目录
fs.mkdirSync('../common-repo', { recursive: true })

// 2. 提取通用工程历史记录
execSync('git subtree split --prefix=packages/common -b common-lib', { stdio: 'inherit' })

// 3. 推送至新仓库
execSync('cd ../common-repo && git init && git pull ../my-project common-lib', { stdio: 'inherit' })

console.log('通用工程已成功解耦至 common-repo 目录')
