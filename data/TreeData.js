/**
 *  Node definition:
 *
 *     id: 'root',
 *     children: ['ovnetzkarteschweiz', 'bauprojekte'],
 *     isExpanded: true,
 *     isChecked: false,
 *     isChildrenLoading: false,
 *     type: 'checkbox',
 *     data: {
 *       title: 'root',
 *     },
 *
 */

const data = {
  rootId: 'root',
  items: {
    root: {
      id: 'root',
      children: ['ovnetzkarteschweiz', 'bauprojekte'],
      type: 'checkbox',
      data: {
        title: 'root',
      },
    },
    ovnetzkarteschweiz: {
      id: 'ovnetzkarteschweiz',
      isExpanded: true,
      children: ['bahnhofplane', 'passagierfrequenzen'],
      type: 'radio',
      data: {
        title: 'ovnetzkarteschweiz',
      },
    },
    bauprojekte: {
      id: 'bauprojekte',
      type: 'radio',
      data: {
        title: 'bauprojekte',
      },
    },
    bahnhofplane: {
      id: 'bahnhofplane',
      isExpanded: true,
      children: ['interaktivbahnhoplan', 'printprodukte'],
      type: 'checkbox',
      data: {
        title: 'bahnhofplane',
      },
    },
    passagierfrequenzen: {
      id: 'passagierfrequenzen',
      children: ['interaktivbahnhoplan2', 'printprodukte2'],
      type: 'checkbox',
      data: {
        title: 'passagierfrequenzen',
      },
    },
    interaktivbahnhoplan: {
      id: 'interaktivbahnhoplan',
      type: 'radio',
      data: {
        title: 'interaktivbahnhoplan',
      },
    },
    printprodukte: {
      id: 'printprodukte',
      type: 'radio',
      data: {
        title: 'printprodukte',
      },
    },
    interaktivbahnhoplan2: {
      children: ['interaktivbahnhoplan3', 'printprodukte3'],
    },
    printprodukte2: {},
    interaktivbahnhoplan3: {},
    printprodukte3: {},
  },
};

const applyDefaultValues = id => {
  const item = data.items[id];
  if (!item) {
    // eslint-disable-next-line no-console
    console.error(`No item with id  ${id}`);
    return;
  }
  item.id = item.id || id;
  item.type = item.type || 'checkbox';
  item.data = item.data || {};
  item.data.title = item.data.title || id;
  item.hasChildren = !!(item.children && item.children.length);
  item.hasParent = item.hasParent || false;
  item.parentId = item.parentId || null;
  item.isExpanded = item.isExpanded || false;
  item.isChecked = item.isChecked || false;
  item.isChildrenLoading = item.isChildrenLoading || false;
};

// Fill the data tree with some helpers properties
Object.keys(data.items).forEach(id => {
  applyDefaultValues(id);
  const item = data.items[id];
  if (item.hasChildren) {
    item.hasChildren = true;
    item.children.forEach(childId => {
      applyDefaultValues(childId);
      data.items[childId].parentId = id;
      data.items[childId].hasParent = true;
    });
  } else {
    item.children = [];
  }
});

// For styleguidist, see styleguide.config.js
if (module.exports) {
  module.exports = data;
}

// For tests
// export default data;