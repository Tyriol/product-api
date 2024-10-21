# Product RESTful API

Create a REST API using node.js and express that allows consumers to add, update and get product
data. A sample project has been included to help you start off.

These are the queries that we should be able to send to the endpoint

Add a new product

`curl -X POST -H &quot;Content-Type: application/json&quot; \
-d &#39;{&quot;stock_number&quot;:&quot;12345&quot;,&quot;name&quot;:&quot;Pro
Batteries&quot;,&quot;Description&quot;:&quot;Batteries&quot;,&quot;Price&quot;:&quot;£1.99&quot;}&#39; \
http://localhost:8080/products`

Update an existing product

`curl -X PUT -H &quot;Content-Type: application/json&quot; \
-d &#39;{&quot;stock_number&quot;:&quot;12345&quot;,&quot;name&quot;:&quot;Pro
Batteries&quot;,&quot;Description&quot;:&quot;Batteries&quot;,&quot;Price&quot;:&quot;£2.99&quot;}&#39; \
http://localhost:8080/products/{stock_number}`

Get an existing product
`curl -H &quot;Content-Type: application/json&quot;
http://localhost:8080/products/{stock_number}`

Consider the following:

1. Ensure your code is readable and maintainable, consider breaking the code into different
   functions https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29
2. Ensure that API Interface is easy for consumers to understand and HTTP codes are returned
   within the response are correct and reflective of the status of the response
3. Consider how you would store the product data, possibly use an in-memory database
4. Ensure you test your code through use of unit testing

We completely understand that people need a work life balance, all we are asking for is you to
implement as much of the solution as possible. We are not expecting polished/perfect solutions we
recognise that the time you will be able to spend on this will be limited. If you run out of time, please
feel see to add pseudo code.

Please add your code to a repository in GitHub that is public and send us a link once you have
completed the task.
