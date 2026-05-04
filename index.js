/***
 *      默认显示-北京市天气
 * 获取北京市天气数据
 * 数据展示到页面
 */
    function getWeather(cityCode){
        myAxios({
            url:"http://hmajax.itheima.net/api/weather",
            params:{
                city:cityCode
            }
        }).then(result=>{
            console.log(result)
            const wObj=result.data;
            //讲数据展示到页面上
            //阴历和阳历
            const dateStr=
            `<div class="date">${wObj.date} 农历 ${wObj.dateLunar}</div>`
            document.querySelector('.date').innerHTML=dateStr
            //城市的名字
            document.querySelector('.selected-city').innerHTML=wObj.area;
            const tObj=result.data.todayWeather
            const todayWStr=
            `
            
            <div class="temperature">${wObj.temperature}</div>
            <div class="air-quality">
                <span class="quality-badge">${wObj.psPm25} ${wObj.psPm25Level}</span>
            </div>
            <div class="weather-info">
                <span>${wObj.weather}</span>
                <span>${wObj.windPower}</span>
            </div>
            <div class="weather-details">
                <span>今天: ${tObj.weather} ${tObj.temNight}~${tObj.temDay}</span>
                <span>紫外线中等</span>
                <span>湿度 ${tObj.humidity}%</span>
                <span>日出 ${tObj.sunriseTime}</span>
                <span>日落 ${tObj.sunsetTime}</span>
            </div>`
        document.querySelector('.main-content').innerHTML=todayWStr
        const dayForecast=result.data.dayForecast
        const dayFStr=dayForecast.map(item=>{
            return `
                    
                    <div class="forecast-card">
                    <div class="forecast-date">${item.dateFormat}</div>
                    <div class="forecast-date-detail">${item.date}</div>
                    <img src="${item.weatherImg}" alt="">
                    <div class="forecast-weather">${item.weather}</div>
                    <div class="forecast-temp">${item.temNight}°C~${item.temDay}°C</div>
                    <div class="forecast-wind">${item.windDirection} &lt;${item.windPower}</div>
                    </div>
                `
        }).join('');
        document.querySelector('.forecast-grid').innerHTML=dayFStr
        })
        
}
getWeather('110100');

/***
 *      搜索城市列表
 * 绑定input事件，获取关键字
 * 获取展示城市里列表数据
 */
// 绑定input事件，获取关键字
    document.querySelector('.search-input').addEventListener
    ('input',(e)=>{
        const city=e.target.value
        console.log(city)
        myAxios({
            url:'http://hmajax.itheima.net/api/weather/city',
            params:{
                city
            }
        }).then(result=>{
            const liStr=result.data.map(item=>{
                console.log(item)
                return`
                <li class="result-item" data-city="北京市" 
                data-district="北京市-北京" data-code=${item.code} style="display: block;">${item.name}</li> 
                `
                
            }).join('')
            document.querySelector('.search-results').innerHTML=liStr
        })
    })

    /***
     *      切换城市天气
     * 绑定城市点击事件，获取城市code值
     * 调用获取并展示天气的函数
     */
    document.querySelector('.search-results').addEventListener
    ('click',e=>{
        if(e.target.classList.contains('result-item')){
            cityCode=e.target.dataset.code;
            getWeather(cityCode);

        }
    })