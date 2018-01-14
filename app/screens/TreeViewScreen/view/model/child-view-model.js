var TreeViewModel = function(sId, sName, bIsChecked, bIsExpanded, bIsSelected, bIsEditable, iDepth, sIcon, aChildrenModels,
                             bHasChildren, oProperties){

  this.getId = function(){
    return sId;
  };

  this.getName = function(){
    return sName;
  };

  this.isChecked = function () {
    return bIsChecked;
  };

  this.isExpanded = function () {
    return bIsExpanded;
  };

  this.isSelected = function () {
    return bIsSelected;
  };

  this.isEditable = function () {
    return bIsEditable;
  };

  this.getDepth = function () {
    return iDepth;
  };

  this.getIcon = function () {
    return sIcon;
  };

  this.hasChildren = function () {
    return bHasChildren;
  };

  this.getChildrenModels = function () {
    return aChildrenModels;
  };

  this.getPropertyByName = function(sPropertyName){
    return oProperties[sPropertyName];
  };

  this.toJSON = function () {
    return {
      "Id": sId,
      "Name": sName,
      "isChecked": bIsChecked,
      "isExpanded": bIsExpanded,
      "isSelected": bIsSelected,
      "isEditable": bIsEditable,
      "properties": oProperties,
      "hasChildren": bHasChildren
    }
  };
};

module.exports = TreeViewModel;

