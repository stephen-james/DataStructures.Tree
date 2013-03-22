var systemUnderTest = systemUnderTest || {
    tree : null,
    flatTable : null,
    nullParentIdFlatTable : null,

    TestHelpers : {
        createPopulatedTree : function(){
            var tree = new DataStructures.Tree(),
                node1 = tree.root.addChild(new DataStructures.TreeNode("node 1")),
                node2 = tree.root.addChild(new DataStructures.TreeNode("node 2")),
                node3 = tree.root.addChild(new DataStructures.TreeNode("node 3")),
                node1_1 = node1.addChild(new DataStructures.TreeNode("node 1.1")),
                node1_2 = node1.addChild(new DataStructures.TreeNode("node 1.2")),
                node1_3 = node1.addChild(new DataStructures.TreeNode("node 1.3")),
                node2_1 = node2.addChild(new DataStructures.TreeNode("node 2.1")),
                node2_2 = node2.addChild(new DataStructures.TreeNode("node 2.2")),
                node3_1 = node3.addChild(new DataStructures.TreeNode("node 3.1")),
                node3_2 = node3.addChild(new DataStructures.TreeNode("node 3.2")),
                node3_3 = node3.addChild(new DataStructures.TreeNode("node 3.3")),
                needle = node2_2.addChild(new DataStructures.TreeNode("needle"));

            return tree;
        },

        createFlatSelfReferencingTable : function() {
            var flatTable = [
                {
                    id : 1,
                    parentId : null,
                    name : "root",
                    size : null
                },
                {
                    id : 2,
                    parentId : 1,
                    name : "node 1",
                    size : 20000
                },
                {
                    id : 6,
                    parentId : 2,
                    name : "node 1.1",
                    size : 20000
                },
                {
                    id : 3,
                    parentId : 1,
                    name : "node 2",
                    size : 20000
                },
                {
                    id : 4,
                    parentId : 3,
                    name : "node 2.1",
                    size : 20000
                },
                {
                    id : 5,
                    parentId : 4,
                    name : "node 2.1.1",
                    size : 20000
                }
            ];

            return flatTable;
        }
    }
};

module("[tree.js] Given a freshly initialised tree datastructure", {

    setup : function(){
        systemUnderTest.tree = new DataStructures.Tree();
    },

    teardown : function(){
        delete systemUnderTest.tree;
    }
});


test("I expect to have a valid object under test", function(){
    var tree = systemUnderTest.tree;

    ok(tree, "tree instance is available for testing");
});

test("I expect to have a default root node", function(){
    var tree = systemUnderTest.tree;

    ok(tree.root, "root node exists");
    ok(tree.root.name == "root", "default root node has the name 'root'");
});

test("root node should have a parent reference to the tree", function(){
    var tree = systemUnderTest.tree;

    ok(tree.root.parent instanceof DataStructures.Tree, "root.parent is an instance of Tree");
});


module("[tree.js] Given a populated tree datastructure", {

    setup : function(){
        systemUnderTest.tree = systemUnderTest.TestHelpers.createPopulatedTree();
    },

    teardown : function(){
        delete systemUnderTest.tree;
    }

});

test("I can search and find a node in the tree", function(){
    var haystack = systemUnderTest.tree,
        needle = haystack.findNode("needle");

    equal(needle.name, "needle", "I managed to find node 'needle' deep in the tree.");
});

test("I can create a simple representation of the tree data", function(){
    var tree = systemUnderTest.tree,
        expected = {
            "name" : "root",
            "children" : [
                {
                    "name" : "node 1",
                    "children" : [
                        {
                            "name" : "node 1.1",
                            "children" : []
                        },
                        {
                            "name" : "node 1.2",
                            "children" : []
                        },
                        {
                            "name" : "node 1.3",
                            "children" : []
                        }
                    ]
                },
                {
                    "name" : "node 2",
                    "children" : [
                        {
                            "name" : "node 2.1",
                            "children" : []
                        },
                        {
                            "name" : "node 2.2",
                            "children" : [
                                {
                                    "name" : "needle",
                                    "children" : []
                                }
                            ]
                        }
                    ]
                },
                {
                    "name" : "node 3",
                    "children" : [
                        {
                            "name" : "node 3.1",
                            "children" : []
                        },
                        {
                            "name" : "node 3.2",
                            "children" : []
                        },
                        {
                            "name" : "node 3.3",
                            "children" : []
                        }

                    ]
                }
            ]
        }

    propEqual(tree.toSimpleObject(),expected, "tree has the expected structure when rendered as a simple object");
})

module("[tree.js] When creating a tree from a flat self referencing table", {

    setup : function(){
        systemUnderTest.flatTable = systemUnderTest.TestHelpers.createFlatSelfReferencingTable();

        systemUnderTest.nullParentIdFlatTable =  systemUnderTest.TestHelpers.createFlatSelfReferencingTable();
        systemUnderTest.nullParentIdFlatTable[0].parentId = "null";
    },

    teardown : function() {
        delete systemUnderTest.flatTable;
    }
});

test("I get a undefined trying to create a tree from undefined", function(){
    var tree = DataStructures.Tree.createFromFlatTable();

    ok(tree === undefined, "factory method returns undefined, when I pass in undefined as a flatTable");
});


test("I get a tree back when I call the createFromFlatTable factory method", function(){
    var tree = DataStructures.Tree.createFromFlatTable(systemUnderTest.flatTable);

    ok(systemUnderTest.flatTable.length > 0, "flat table in sytem under test has some rows in it")

    ok(tree instanceof DataStructures.Tree, "factory method returns a tree");
});

test("root nodes with string representations of null for the parentId aren't misinterpretted", function(){
    // this was a bug fix
    var tree = DataStructures.Tree.createFromFlatTable(systemUnderTest.nullParentIdFlatTable);

    ok(systemUnderTest.nullParentIdFlatTable.length > 0, "[test preqrequisite] flat table in sytem under test has some rows in it");
    equal(systemUnderTest.nullParentIdFlatTable[0].parentId, "null", "[test preqrequisite] root node has a string 'null' as the parentId");
    ok(tree instanceof DataStructures.Tree, "factory method returns a tree");
});
