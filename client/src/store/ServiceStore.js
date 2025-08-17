import { makeAutoObservable } from "mobx";

export default class ServiceStore{
  constructor(){
    this._types = []
    this._services = []
    this._selectedType = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 12
    this._errors = '';
    makeAutoObservable(this)
  }
  setTypes(types){
    this._types = types
  }
  setServices(services){
    this._services = services
  }
  setPage(page){
    this._page = page
  }
  setSelectedType(type){
    this.setPage(1)
    this._selectedType = type
  }
  setTotalCount(count){
    this._totalCount = count
}
  setErrors(str){
        this._errors = str;
}
  get types(){
    return this._types
  }
  get services(){
    return this._services
  }
  get selectedType() {
    return this._selectedType
}
get totalCount(){
  return this._totalCount
}
get page(){
  return this._page
}
get limit(){
  return this._limit
}
}