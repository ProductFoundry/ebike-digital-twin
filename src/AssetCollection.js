/* Collection of Assets
 */
define('AssetCollection', ['Asset'], function (Asset) {
  const t = require('Position');

  function AssetCollection(assets = []) {
    this.assets = assets;
  }

  AssetCollection.prototype.addAsset = function (assetId, assetName, assetType, lat, long, ts) {
    const asset = new Asset(assetId, assetName, assetType, lat, long, ts);
    this.assets.push(asset);
  }

  AssetCollection.prototype.isKnown = function (aId) {
    return this.assets.find(a => a.id === aId);
  }

  AssetCollection.prototype.getAsset = function (id) {
    return this.assets.find(a => a.id === id);
  }

  AssetCollection.prototype.setAssetPosition = function (id, pos) {
    const asset = this.assets.find(a => a.id === id);
    asset.setCurrentPosition(pos);
  }

  AssetCollection.prototype.getAllAssets = function () {
    return this.assets;
  }

  return AssetCollection;
});