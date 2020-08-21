<?php

// Include RAP
define("RDFAPI_INCLUDE_DIR", "C:/xampp/htdocs/chatAppRdf/rdfapi-php-master/api/");
include(RDFAPI_INCLUDE_DIR . "RdfAPI.php");

// Filename of an RDF document
$base="users.rdf";

// Create a new MemModel
$model = ModelFactory::getDefaultModel();

// Load and parse document
$model->load($base);

// Output model as HTML table
$model->writeAsHtmlTable();