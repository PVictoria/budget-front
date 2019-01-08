import React from "react";
import Login from "./Login";
import {Route, Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import Navigation from "./Navigation";
import Greeting from "./Greeting";
import MyTable from "./article/MyTable";
import CreateArticle from "./article/CreateArticle";
import CreateOperation from "./operation/CreateOperation";
import OperationsList from "./operation/OperationsList";
import Balance from "./balance/Balance";
import LinearChart from "./statistics/LinearChart";
import BoxChart from "./statistics/BoxChart";
import PieStatChart from "./statistics/PieStatChart";

const App = () => (
    <Switch>
        <Route exact path='/login' component={Login}/>
        <Route path='/navigation' component={Navigation}/>
        <Route path='/greeting' component={Greeting}/>
        <Route path='/articles' component={MyTable}/>
        <Route path='/create-article' component={CreateArticle}/>
        <Route path='/create-operation' component={CreateOperation}/>
        <Route path='/operations' component={OperationsList}/>
        <Route path='/balance' component={Balance}/>
        <Route path='/line-chart' component={LinearChart}/>
        <Route path='/box-chart' component={BoxChart}/>
        <Route path='/pie-chart' component={PieStatChart}/>
    </Switch>
);

export default App


//todo: рефакторинг страниц со статистикой (особонно pie)
//+todo: добавить навигацию на страницы со статистикой
//todo: очистка выпадающих списков
//+todo: разобраться с преобразованием даты
//todo: заменить дата пикеры на другие, скорректировать бэк
//todo: вынести общие элементы в helper (data-picker, navigation)
//todo: вынести запросы к бэку в отдельный класс ??
//todo: подобрать цвета и навести красоту