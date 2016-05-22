<%-- 
    Document   : index
    Created on : Apr 30, 2016, 1:35:16 PM
    Author     : Admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    
    <style>
        table {
            border-collapse: collapse;
            width: 50%;
            margin: auto;
            border-radius: 50px;
        }
        
        td{
            color: red;
            size: 10vmax;
            text-align:center;
        }
        
        
    </style>
    <body>
       
       <sql:setDataSource var="snapshot" driver="com.mysql.jdbc.Driver"
     url="jdbc:mysql://localhost/sakila"
     user="root"  password=""/>
 
<sql:query dataSource="${snapshot}" var="result">
SELECT * from actor order by first_name;
</sql:query>

<sql:query dataSource="${snapshot}" var="result1">
SELECT * from actor;
</sql:query>
<select name="Sort" value="sort">
    <option id="sortById" value="idko">ID</option>
    <option id="sortFName" value="fnameko">First Name</option>
</select>

<script>
    var x = document.getElementById("sortById");
    var y = document.getElementById("sortFName");
    var z = document.getElementById("one");
    var a = document.getElementById("two");
    
    if (x)
</script>



<table border="1" width="100%" id="one">
<tr>
   <th>Actor ID</th>
   <th>First Name</th>
   <th>Last Name</th>
</tr>

<c:forEach var="row" items="${result.rows}">
<tr>
   <td><c:out value="${row.actor_id}"/></td>
   <td><c:out value="${row.first_name}"/></td>
   <td><c:out value="${row.last_name}"/></td>
</tr>
</c:forEach>
</table>
 

<table border="1" width="100%" id="two">
<tr>
   <th>Actor ID</th>
   <th>First Name</th>
   <th>Last Name</th>
</tr>

<c:forEach var="row" items="${result1.rows}">
<tr>
   <td><c:out value="${row.actor_id}"/></td>
   <td><c:out value="${row.first_name}"/></td>
   <td><c:out value="${row.last_name}"/></td>
</tr>
</c:forEach>
</table>
        
    </body>
</html>
