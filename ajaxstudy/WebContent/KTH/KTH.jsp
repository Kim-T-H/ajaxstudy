<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt"  uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>    
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<link rel="stylesheet" href="../20200522TEST/KTH.css">
<fmt:requestEncoding value="UTF-8"/>
<sql:setDataSource var="conn" driver="org.mariadb.jdbc.Driver"
  url="jdbc:mariadb://localhost:3306/classdb"
  user="scott" password="1234"/>
  <sql:query var="qu" dataSource="${conn}">
   select * from professor where ${param.column} like ?
   <sql:param>%${param.find}%</sql:param>
</sql:query>
<table border="1" style ="border-collapse:collapse;">
<tr><th>교수 번호</th><th>이름</th><th>아이디</th>
    <th>급여</th><th>입사일</th><th>직급</th></tr>
<c:forEach var="data" items="${qu.rows}">
<tr><td>${data.no}</td>
	<td>${data.name}</td>
    <td>${data.id}</td>
    <td><c:out value="${data.salary}" /></td>
    <td>${data.hiredate}</td>
    <td>${data.position}</td></tr>
</c:forEach>
</table>