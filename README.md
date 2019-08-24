
### 前言
在公司项目中使用前端框架中table组件时，发现显示数据量一多，table组件就会很卡顿，换了几种前端框架都没能解决这个问题。最后在Navicat软件内显示数据的表格中获取到灵感，自制了一个table组件供自己项目使用。



### npm


```
npm install vue-lin-table


main.js内

import VueLinTable from "vue-lin-table"
Vue.use(VueLinTable);

```



### API

###### table props

<table style="width:100%;">
    <thead>
        <tr>
            <th>属性</th>
            <th width="500">说明</th>
            <th> 类型</th>
            <th> 默认值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>height</td>
            <td>表格高度</td>
            <td>Number,String</td>
            <td>600</td>
        </tr>
        <tr>
            <td>columns</td>
            <td>表格列的配置描述，具体项见后文</td>
            <td>Array</td>
            <td> []</td>
        </tr>
        <tr>
            <td>data</td>
            <td>显示的结构化数据</td>
            <td>Array</td>
            <td> []</td>
        </tr>
        <tr>
            <td>headerHeight</td>
            <td>表格头部高度</td>
            <td>Number, String</td>
            <td>40</td>
        </tr>
        <tr>
            <td>bodyRowHeight</td>
            <td>表格行高</td>
            <td>Number, String</td>
            <td>30</td>
        </tr>
        <tr>
            <td>wheelHeight</td>
            <td>滚动条高度(预防不同浏览器)</td>
            <td>Number</td>
            <td>18</td>
        </tr>
        <tr>
            <td>minWidth</td>
            <td>列最小宽度</td>
            <td>Number</td>
            <td>50</td>
        </tr>
        <tr>
            <td>isColDrag</td>
            <td>列是否拖动</td>
            <td>Boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>tableAlign</td>
            <td>表格全部列位置</td>
            <td>String</td>
            <td>-</td>
        </tr>
    </tbody>
</table>

###### table events

<table style="width:100%;">
    <thead>
        <tr>
            <th>事件名</th>
            <th width="500">说明</th>
            <th> 返回值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>table-change</td>
            <td>多选模式下,点击多选框时触发</td>
            <td>selection：已选项数据</td>
        </tr>
         <tr>
            <td>table-scroll</td>
            <td>表格滚动时触发</td>
            <td>event</td>
        </tr>
         <tr>
            <td>table-row-click</td>
            <td>表格行点击触发</td>
            <td>返回点击行数据</td>
        </tr>
    </tbody>
</table>

###### columns props

<table style="width:100%;">
    <thead>
        <tr>
            <th>属性</th>
            <th width="500">说明</th>
            <th> 类型</th>
            <th> 默认值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td>列类型，可选值为 selection</td>
            <td> String</td>
            <td>-</td>
        </tr>
        <tr>
            <td>title</td>
            <td>列头显示文字</td>
            <td>String</td>
            <td>-</td>
        </tr>
        <tr>
            <td>key</td>
            <td>对应列内容的字段名</td>
            <td>String</td>
            <td>-</td>
        </tr>
        <tr>
            <td>width</td>
            <td>列宽</td>
            <td>Number</td>
            <td>-</td>
        </tr>
        <tr>
            <td>align</td>
            <td>对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐</td>
            <td>String</td>
            <td>left</td>
        </tr>
        <tr>
            <td>fixed</td>
            <td>列是否固定在左侧或者右侧，可选值为 left 左侧和 right 右侧</td>
            <td>String</td>
            <td>left</td>
        </tr>
         <tr>
            <td>render</td>
            <td>自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引。</td>
            <td>Function</td>
            <td>-</td>
        </tr>
    </tbody>
</table>





  
