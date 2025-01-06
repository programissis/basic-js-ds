const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	rootNode = null;

	root() {
		return this.rootNode;
	}

	add(data) {
		const newNode = new Node(data);

		if (!this.rootNode) {
			this.rootNode = newNode;
			return;
		}

		let currentNode = this.rootNode;
		while (true) {
			if (data < currentNode.data) {
				if (!currentNode.left) {
					currentNode.left = newNode;
					return;
				}
				currentNode = currentNode.left;
			} else {
				if (!currentNode.right) {
					currentNode.right = newNode;
					return;
				}
				currentNode = currentNode.right;
			}
		}
	}

	has(data) {
		return this.find(data) !== null;
	}

	find(data) {
		let currentNode = this.rootNode;
		while (currentNode) {
			if (data === currentNode.data) {
				return currentNode;
			} else if (data < currentNode.data) {
				currentNode = currentNode.left;
			} else {
				currentNode = currentNode.right;
			}
		}
		return null;
	}

	remove(data) {
		const removeNode = (node, data) => {
			if (!node) {
				return null;
			}

			if (data === node.data) {
				if (!node.left && !node.right) {
					return null;
				}
				if (!node.left) {
					return node.right;
				}
				if (!node.right) {
					return node.left;
				}

				let minNode = node.right;
				while (minNode.left) {
					minNode = minNode.left;
				}
				node.data = minNode.data;
				node.right = removeNode(node.right, minNode.data);
				return node;
			} else if (data < node.data) {
				node.left = removeNode(node.left, data);
				return node;
			} else {
				node.right = removeNode(node.right, data);
				return node;
			}
		};

		this.rootNode = removeNode(this.rootNode, data);
	}

	min() {
		if (!this.rootNode) {
			return null;
		}

		let currentNode = this.rootNode;
		while (currentNode.left) {
			currentNode = currentNode.left;
		}
		return currentNode.data;
	}

	max() {
		if (!this.rootNode) {
			return null;
		}

		let currentNode = this.rootNode;
		while (currentNode.right) {
			currentNode = currentNode.right;
		}
		return currentNode.data;
	}
}

module.exports = {
	BinarySearchTree,
};
