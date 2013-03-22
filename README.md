DataStructures.Tree
===================

A JavaScript data structure library containing classes for representing tree structures.  

A primary purpose of this library is the ability to be able to convert from a flat self-referencing table to a hierarchical tree, which in turn can be decorated.

The illustrating example in index.html shows a flat table representing the code in the DataStructures library being converted to hierarchical json and decorated in a way that is suitable for d3 circle packing.

Tests for DataStructures.* are written in QUnit and can be found here.

TODO - a few!  I need to review this properly and check out how I can get rid of the circular refs between nodes and parents
