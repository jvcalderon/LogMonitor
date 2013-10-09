LogMonitor
==========

A simple software for logs control. This system allows to create actions from rules, for example send an alert by email. With a config file we can set the logs on which we need a permanent listening, and link each log with a "handler".
## Requirements
- Node.js
- NPM
- OS Unix based

## Install
We need to install the module 'emailjs' for sending emails using the handler example.
<pre><code>
$ npm install emailjs
</code></pre>

Now we need to rename config.json_dist:
<pre><code>
$ mv config.json_dist config.json
</code></pre>

### Setting your logs in config.json
It is interesting to look at the parameter 'logsToTail'; through this array we can create many 'tail -f' processes as we need.
<pre><code>
&quot;logsToTail&quot;: [{
      &quot;name&quot;:&quot;_HERE_YOUR_LOG_NAME_&quot;,          
      &quot;logFile&quot;:&quot;_HERE_YOUR_LOG_FILE_PATH_&quot;,          
      &quot;dataHandler&quot; : &quot;_HERE_YOUR_HANDLER_FILE_NAME_WITHOUT_JS_EXTENSION_&quot;          
      }]
</code></pre>

<strong>_HERE_YOUR_LOG_NAME_</strong> Is the unique identifier for the log that we will observe.
<strong>_HERE_YOUR_LOG_FILE_PATH_</strong> The log's path.
<strong>_HERE_YOUR_HANDLER_FILE_NAME_WITHOUT_JS_EXTENSION_</strong> Is the name of the handler that will handle the process output.

For example, if we would like to observe the logs 'dev' and 'prod' of Symfony2, our 'logsToTail' might look like this:
<pre><code>
&quot;logsToTail&quot;: [{   	
      &quot;name&quot;:&quot;xxx_dev&quot;,   	
      &quot;logFile&quot;:&quot;/var/www/xxx/app/logs/dev.log&quot;,   	
      &quot;dataHandler&quot; : &quot;symfony2_example&quot;   	
      },          
      {   	
      &quot;name&quot;:&quot;xxx_prod&quot;,   	
      &quot;logFile&quot;:&quot;/var/www/xxx/app/logs/prod.log&quot;,   	
      &quot;dataHandler&quot; : &quot;symfony2_example&quot;   	
      }]
</code></pre>

For launch LogMonitor:
<pre><code>
$ node app.js
</code></pre>

If you need more information you can read: <a href="http://www.frontandback.org/back_end/alertas_logs_tiempo_real">http://www.frontandback.org/back_end/alertas_logs_tiempo_real</a>
