const fs = window.require('fs').promises;

export const mapArr = (arr) => {
  if (Array.isArray(arr)) {
    return arr.reduce((prev, item) => {
      prev[item.id] = item;
      return prev;
    }, {});
  }
  return [];
};

export const objToArr = (obj) => {
  return Object.values(obj);
};

export const readFile = (path) => fs.readFile(path, 'utf-8');

export const writeFile = (path, content) => fs.writeFile(path, content, 'utf-8');

export const renameFile = (path, newPath) => fs.rename(path, newPath);

export const deleteFile = (path) => fs.unlink(path);

// 获取父节点
export const getParentNode = (node, parentClassName) => {
  let currentEle = node;

  while (currentEle) {
    if (currentEle.classList.contains(parentClassName)) {
      return currentEle;
    } else {
      currentEle = currentEle.parentNode;
    }
  }

  return false;
};