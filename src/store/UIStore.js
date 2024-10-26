import { observable, action, makeObservable } from "mobx";  

class UIStore {
    constructor(){
        makeObservable(this)         
    }
 
    @observable modalVisible = false;     

    @action setModalVisible(modalVisible){        
        this.modalVisible = modalVisible;    
    } 
}                                      

export default new UIStore();  