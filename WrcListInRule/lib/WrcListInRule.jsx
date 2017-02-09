/**
 * @file   列表吸顶组件
 * @author sunwen05@baidu.com
 */

import React, { Component } from 'react';
import style from './WrcListInRule.useable.less';
import $ from 'webpack-zepto';

export default class WrcListInRule extends Component {
    constructor (props) {
        super(props);
        this.state = {
            listInKey: [],
            titleIntopTxt: null
        }
    }
    componentWillMount () {
        style.use();
        this.setState({
            listInKey: this.getAllChars(this.props.list)
        })
    }
    componentDidMount() {
        // console.log(this.props.type)
        this.titleRule();
        if (!this.props.type) {
            this.setState({
                titleIntopTxt: $('.list-title').eq(0).text()
            });
            $('.list-title').eq(0).css('visibility', 'hidden');
        }
    }
    componentWillUnmount() {
        style.unuse();
        $(window).off('touchmove')
        $(window).off('scroll')
    }

    /*
     * 设置置顶的头部title
     * @return {void} void返回值
     */
    titleRule () {
        let self = this,
            domPart = $('.list-part'),  // 存储所有list
            domPartHeight = [], // 存储所有list的高
            titleIndex, // 当前滚动条在domPartHeight中的位置
            lastTitleIndex = null; // 上一次滚动条所在的位置
        // 存储所有list的高（list到顶部的距离 + 自身的高）
        for (let i = 0; i < domPart.length; i++) {
            domPartHeight.push(domPart[i].offsetTop + domPart[i].offsetHeight)
        }
        // 滚动
        $(window).on('scroll touchmove', function () {
            // 当前滚动条所处的位置
            let top = $(window).scrollTop() + $('.du-header-title').height();
            // 当前滚动条在domPartHeight中的位置
            titleIndex = self.turnFindIndex(domPartHeight, top);
            // type为true时吸顶的效果为推动，否则为固定div置顶
            if (self.props.type) {
                self.titleInDrive(titleIndex)
            }
            else {
                if (lastTitleIndex === null || lastTitleIndex !== titleIndex) {
                    lastTitleIndex = titleIndex;
                    self.titleNotInDrive(titleIndex)
                }
            }
        })
    }

    /*
     * 设置置顶的头部title（推动）
     * @param {num} n 当前置顶的list的id
     * @return {void} void返回值
     */
    titleInDrive (n) {
        let listTitle = $('.list-in-top .list-title'),  // 所有的list中需要置顶的title
            headerHeight = $('.du-header-title').height(),  // <header>的高
            lastTitleTop = $(window).scrollTop() + headerHeight + listTitle.eq(n).height();
        // lastTitleTop（当前滚动条的top = 滚动条的高度 + <header>的高 + list的title的高）

        // 给当前置顶list的title添加固定样式（position:fixed;top:<height>px）
        listTitle.eq(n).addClass('titleInDrive');
        listTitle.eq(n).css('top', headerHeight);

        // 滚动中一直进行设定（目的，为了给不在当前置顶时的list的title回复状态）
        listTitle.eq(n).css('position', 'fixed');
        listTitle.eq(n + 1).css('position', 'absolute');
        listTitle.eq(n + 1).css('top', '0');

        // 当下一个置顶元素到页面顶部的距离 <= 当前滚动条的top
        if ($('.list-in-top').eq(n + 1).offset().top <= lastTitleTop) {
            // 当前置顶元素的高 = 下一个置顶元素到页面顶部的距离 - list中title的高 + <header>的高
            listTitle.eq(n).css('top', headerHeight + listTitle.eq(n + 1).offset().top - lastTitleTop);
        }
        else {
            // 当滚动过快，将上一个置顶元素的高设置为<header>的高 - list中title的高
            listTitle.eq(n - 1).css('top', headerHeight - listTitle.eq(n - 1).height());
        }
    }

    /*
     * 设置置顶的头部title（固定div置顶）
     * @param {num} n 当前置顶的list的id
     * @return {void} void返回值
     */
    titleNotInDrive (n) {
        this.setState({
            titleIntopTxt: $('.list-title').eq(n).text()
        })
    }

    /*
     * 获取所有首字母数组
     * @param {object} allLetter 所有的需要处理首字母的对象集合
     * @return {void} void返回值
     */
    getAllChars (allLetter) {
        let allchars = []; // 每一行首字母
        for (let item in allLetter) {
            allchars.push(item);
        }
        return allchars;
    }

    /*
     * findIndex的ES5转换
     * @param {arr} arr 数组
     * @param {number} ele 查找的元素
     * @return {number} 查找元素在数组中的位置
     */
    turnFindIndex (arr, ele) {
        // arr.findIndex((n, i) => {
        //     return n > ele;
        // })
        for (let  j = 0; j < arr.length; j++) {
            if(arr[j] > ele) {
                return j;
            }
        }
    }

    /*
     * list点击事件
     * @param {num} id 选中元素的id
     * @param {string} name 选中元素的名称
     * @return {void} void返回值
     */
    handleClick (id, name) {
        this.props.selectTurnToPage(id, name);
    }

    render () {
        var titleIntop = null;
        if (!this.props.type) {
            titleIntop = (<div className="du-panel-hd title-in-top">{this.state.titleIntopTxt}</div>)
        }
        return (
            <div>
                {titleIntop}
                {
                    this.state.listInKey.map((part, i) => {
                        return (
                            <div key={i} className={this.props.type ? 'du-panel list-part list-in-top' : 'du-panel list-part'}>
                                <div className="du-panel-hd list-title">{part}</div>
                                <div className="du-panel-bd list-content">
                                    <ul className="du-list">
                                    {
                                        this.props.list[part].map((item, j) => {
                                            return (
                                                <li key={j} className="du-item du-item-side" onClick={this.handleClick.bind(this, item[this.props.structure.id], item[this.props.structure.name])}>
                                                    {/*<div className="du-item-hd"></div>*/}
                                                    <div className="du-item-bd"><a>{item[this.props.structure.name]}</a></div>
                                                </li>
                                            )
                                        })
                                    }
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}