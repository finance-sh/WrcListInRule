import React, {Component} from 'react';
import {render} from 'react-dom';
import 'react-deltaui/src/components/Delta';
import DuWrap from 'react-deltaui/src/components/DuWrap';
import './reset.css';
import {static_cities} from './city.js'
import WrcListInRule from './WrcListInRule/index.jsx';

// 获取到数据的参数名称
const structure = {
    id: 'cityCode',
    name: 'cityName'
}

class CityDemo extends Component{
    constructor() {
        super();
        console.log(static_cities)
    }
    /*
     * 城市点击事件
     * @param {num} id 当前城市的id
     * @param {string} name 当前城市的名称
     * @return {void} void返回值
     */
    selectCity(id, name) {
        console.log(id)
        console.log(name)
    }

    render() {
        return (
            <div className="du-page-outer">
                <div className="du-page-home">
                    <DuWrap>
                        <div className="city-select">
                            <WrcListInRule list={static_cities.cityMap} type={false} selectTurnToPage={this.selectCity} structure={structure} />
                        </div>
                    </DuWrap>
                </div>
            </div>
        )
    }
}

render(
    <CityDemo />,
    document.getElementById('du-app')
);
