# 上传
```bash
<WrcListInRule list={static_cities.cityMap} type={false} selectTurnToPage={this.selectCity} structure={structure} />
```

# 开发注意事项
* list 传入的数据
* selectTurnToPage 传入的点击函数
* type（true为推动，false为固定div置顶）
* !!!bug!!! 推动效果在ios的钱包app和微信app 滚动有延迟

# list格式(传入data.content.cityMap)
```bash
{
    "ret": "0",
    "msg": "OK",
    "content": {
        "cityMap": {
            "A": [{
                "cityCode": "0614",
                "cityName": "\u963f\u76df"
            }]
        }
    }
}
```