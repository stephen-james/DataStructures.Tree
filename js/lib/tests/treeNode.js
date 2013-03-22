var systemUnderTest = systemUnderTest || { treeNode : null };

module("[treeNode.js] Given a freshly initialised tree node", {

    setup : function(){
        systemUnderTest.treeNode = new DataStructures.TreeNode();
    },

    teardown : function(){
        delete systemUnderTest.treeNode;
    }
});

test("I expect to have a valid object under test", function(){
    var treeNode = systemUnderTest.treeNode;
    ok(treeNode, "node instance is available for testing");
})

test("I can rename a node", function(){
    var treeNode = systemUnderTest.treeNode,
        expected = 'Shiny New Name';

    treeNode.name = expected;
    equal(treeNode.name, expected, "I was able to give the node a shiny new name.");
})

test("The node is an orphan", function(){
    var treeNode = systemUnderTest.treeNode;

    equal(treeNode.parent, undefined, "no parent when freshly initialised, ie. we are able to create nodes in isolation. (a good thing)");
    equal(treeNode.siblings.length, 0, "no siblings when freshly initialised");
    equal(treeNode.children.length, 0, "no children when freshly initialised");
})

test("I can add a child node", function(){
    var treeNode = systemUnderTest.treeNode,
        childNodeToAdd = new DataStructures.TreeNode("child node to add");

    treeNode.addChild(childNodeToAdd);

    equal(treeNode.children.length, 1, "after adding a child, the node children length is 1");
    var x = treeNode.children.nodeAt(0);
    console.log(x);
    //propEqual(x, childNodeToAdd, "the child is the one I added (property comparison)");
})

