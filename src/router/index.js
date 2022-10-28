import React from 'react';
import {
    Switch,
    Route,
    Redirect,
  } from 'react-router-dom';
import Category from '../views/Category';
import CreateCategory from '../views/Category/CreateCategory';
import EditCategory from '../views/Category/EditCategory';
import Dashboard from '../views/Dashboard';
import Setting from '../views/Setting';
import Login from '../views/Login';
import NotFound from '../views/NotFound';
import Product from '../views/Product';
import CreateProduct from '../views/Product/CreateProduct';
import Template from '../Template'
import Authenticated from '../Component/middleware/Authenticated';
import EditProduct from '../views/Product/EditProduct';
import Stock from '../views/Stock';
import Transaction from '../views/Transaction';
import CreateTransaction from '../views/Transaction/CreateTransaction';
import DetailTransaction from '../views/Transaction/DetailTransaction';
import FileManager from '../views/FileManager';
import JournalCategory from '../views/JournalCategory';
import CreateJournalCategory from '../views/JournalCategory/CreateJournalCategory';
import EditJournalCategory from '../views/JournalCategory/EditJournalCategory';
import Bank from '../views/Bank';
import CreateBank from '../views/Bank/CreateBank';
import EditBank from '../views/Bank/EditBank';


function Router(props) {
    
    return (
        <div>
            <Switch>
                {/* Dashboard Module */}
                <Route exact path='/'>
                <Redirect
                    to={{
                    pathname: "/home"
                    }}
                />
                </Route>
                
                <Route exact path='/home'>
                    <Authenticated>
                        <Template>
                            <Dashboard/>
                        </Template>
                    </Authenticated>
                </Route>
                <Route exact path='/setting'>
                    <Authenticated>
                        <Template>
                            <Setting/>
                        </Template>
                    </Authenticated>
                </Route>

                {/* Category Module */}
                <Route exact path='/category'>
                    <Authenticated>
                        <Template>
                            <Category />
                        </Template>
                    </Authenticated>
                </Route>
                <Route exact path='/category/create'>
                    <Authenticated>
                        <Template>
                            <CreateCategory />
                        </Template>
                    </Authenticated>
                </Route>
                <Route exact path='/category/edit/:id'>
                    <Authenticated>
                        <Template>
                            <EditCategory />
                        </Template>
                    </Authenticated>
                </Route>

                
                <Route exact path='/product'>
                    <Authenticated>
                        <Template>
                            <Product />
                        </Template>
                    </Authenticated>
                </Route>
                <Route exact path='/product/create'>
                    <Authenticated>
                        <Template>
                            <CreateProduct />
                        </Template>
                    </Authenticated>
                </Route>
                <Route exact path='/product/edit/:id'>
                    <Authenticated>
                        <Template>
                            <EditProduct />
                        </Template>
                    </Authenticated>
                </Route>

                
                <Route exact path='/stock'>
                    <Authenticated>
                        <Template>
                            <Stock />
                        </Template>
                    </Authenticated>
                </Route>

                
                <Route exact path='/transaction'>
                    <Authenticated>
                        <Template>
                            <Transaction />
                        </Template>
                    </Authenticated>
                </Route>
                <Route exact path='/transaction/create'>
                    <Authenticated>
                        <Template>
                            <CreateTransaction />
                        </Template>
                    </Authenticated>
                </Route>
                <Route exact path='/transaction/detail/:invoice_id'>
                    <Authenticated>
                        <Template>
                            <DetailTransaction />
                        </Template>
                    </Authenticated>
                </Route>

                {/* bank Module */}
                <Route exact path='/bank'>
                    <Authenticated>
                        <Template>
                            <Bank />
                        </Template>
                    </Authenticated>
                </Route>
                <Route exact path='/bank/create'>
                    <Authenticated>
                        <Template>
                            <CreateBank />
                        </Template>
                    </Authenticated>
                </Route>
                <Route exact path='/bank/edit/:id'>
                    <Authenticated>
                        <Template>
                            <EditBank />
                        </Template>
                    </Authenticated>
                </Route>
                
                <Route exact path='/file'>
                    <Authenticated>
                        <Template>
                            <FileManager />
                        </Template>
                    </Authenticated>
                </Route>

                

                {/* Category Module */}
                <Route exact path='/journal-category'>
                    <Authenticated>
                        <Template>
                            <JournalCategory />
                        </Template>
                    </Authenticated>
                </Route>
                <Route exact path='/journal-category/create'>
                    <Authenticated>
                        <Template>
                            <CreateJournalCategory />
                        </Template>
                    </Authenticated>
                </Route>
                <Route exact path='/journal-category/edit/:id'>
                    <Authenticated>
                        <Template>
                            <EditJournalCategory />
                        </Template>
                    </Authenticated>
                </Route>

                <Route exact path='/login' component={Login} />
                
                <Route exact path='*' component={NotFound} />
            </Switch>
        </div>
    );
}

export default Router;