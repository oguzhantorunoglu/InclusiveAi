import { observable, action, makeObservable } from "mobx";  

class UXStore {
    constructor(){
        makeObservable(this)         
    }

    @observable params = {};     

    @action setParams(params){        
        this.params = params;    
    } 

    @observable activePage = "HomeScreen";     

    @action setActivePage(activePage){        
        this.activePage = activePage;    
    } 
}                                      

export default new UXStore();