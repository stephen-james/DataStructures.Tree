var systemUnderTest = systemUnderTest || { treeNodeCollection : null };

module("[treeNodeCollection.js] Given a freshly initialised tree node collection", {

    setup : function(){
        systemUnderTest.treeNodeCollection = (new DataStructures.Tree()).root.children;
    },

    teardown : function(){
        delete systemUnderTest.treeNodeCollection;
    }
});

test("I expect to have a valid object under test", function(){
    var treeNodeCollection = systemUnderTest.treeNodeCollection;
    ok(treeNodeCollection, "node collection instance is available for testing");
});

test("New nodes added to the collection keep track of their siblings", function(){
    var treeNodeCollection = systemUnderTest.treeNodeCollection,
        firstSibling = new DataStructures.TreeNode("first sibling"),
        secondSibling = new DataStructures.TreeNode("second sibling"),
        lastSibling = new DataStructures.TreeNode("last sibling");

    treeNodeCollection.addNode(firstSibling);
    treeNodeCollection.addNode(secondSibling);
    treeNodeCollection.addNode(lastSibling);

    equal(firstSibling.previousSibling, undefined,  "the 'first sibling' knows it's previous sibling is undefined.");
    equal(secondSibling.previousSibling.name, firstSibling.name,  "the 'second sibling' knows it's previous sibling is the 'first sibling'.");
    equal(firstSibling.nextSibling.name, "second sibling",  "the 'first sibling' knows it's next sibling is the 'second sibling'.");
    equal(lastSibling.nextSibling, undefined,  "the 'last sibling' knows it's next sibling is undefined.");
});

test("I can find a node in the collection", function(){
    var treeNodeCollection = systemUnderTest.treeNodeCollection,
        firstSibling = new DataStructures.TreeNode("first sibling"),
        secondSibling = new DataStructures.TreeNode("second sibling"),
        lastSibling = new DataStructures.TreeNode("last sibling");

    secondSibling.id = 23;

    treeNodeCollection.addNode(firstSibling);
    treeNodeCollection.addNode(secondSibling);
    treeNodeCollection.addNode(lastSibling);

    equal(treeNodeCollection.find(secondSibling), secondSibling, "I can find the 'second sibling' by passing in the object I'm looking for");
    equal(treeNodeCollection.find("second sibling"), secondSibling, "I can find the 'second sibling' by name");
    equal(treeNodeCollection.find(23, function(node, value){ return node.id == value }), secondSibling, "I can find the 'second sibling' using a custom matching function, which matches on id.");
    equal(treeNodeCollection.find("first sibling"), firstSibling, "I can find the 'first sibling' by name");
    equal(treeNodeCollection.find("nonsense"), undefined, "If I search for something which doesn't exist I get back undefined");
});

