import{r as _,j as e,b as C,S,B as d}from"./index-wtGTxSMT.js";import{a as r,T as P,R as z,C as v}from"./row-UWMG3hts.js";import{T as E}from"./index-BPwaGy5a.js";import{D as m}from"./index-CDBRmHIw.js";import{R as c}from"./CheckCircleOutlined-BvipOwjS.js";import{R as p}from"./CopyOutlined-BR-goS_i.js";import{F as y}from"./Table-CzOluTw_.js";import{T as R}from"./index-BLZouVBv.js";import{C as u}from"./Collapse-DNzrkjvJ.js";import{D as i}from"./index-gbjdVC6n.js";import{s as q}from"./index-VDe2hEyF.js";import"./CopyOutlined-DO-5wM49.js";import"./pickAttrs-aV3CZMNf.js";import"./index-Pws8JbMs.js";import"./useForm-BIYdoLOq.js";import"./Input-C9rl66ME.js";import"./CheckCircleFilled-Dtgsd_D3.js";const{Title:t,Paragraph:n,Text:o}=E,{TabPane:x}=P,{Panel:h}=u,W=()=>{const[s,b]=_.useState(null),l=(a,j)=>{navigator.clipboard.writeText(a),b(j),q.success("已复制到剪贴板"),setTimeout(()=>b(null),2e3)},w=[{id:"chat-completion",name:"Chat Completion",method:"POST",path:"/api/v1/chat/completions",description:"与大语言模型进行对话交互"},{id:"text-embedding",name:"Text Embedding",method:"POST",path:"/api/v1/embeddings",description:"将文本转换为向量表示"},{id:"model-list",name:"List Models",method:"GET",path:"/api/v1/models",description:"获取可用模型列表"},{id:"model-info",name:"Model Information",method:"GET",path:"/api/v1/models/{model_id}",description:"获取指定模型的详细信息"}],k=[{name:"model",type:"string",required:!0,description:"要使用的模型ID"},{name:"messages",type:"array",required:!0,description:"对话消息历史"},{name:"temperature",type:"number",required:!1,description:"采样温度，控制输出随机性"},{name:"max_tokens",type:"integer",required:!1,description:"生成的最大token数"},{name:"top_p",type:"number",required:!1,description:"核采样参数"},{name:"stream",type:"boolean",required:!1,description:"是否启用流式输出"}],A=[{name:"id",type:"string",description:"响应ID"},{name:"object",type:"string",description:"对象类型"},{name:"created",type:"integer",description:"创建时间戳"},{name:"model",type:"string",description:"使用的模型ID"},{name:"choices",type:"array",description:"生成结果列表"},{name:"usage",type:"object",description:"token使用情况"}],g=`curl -X POST "https://api.example.com/api/v1/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
  "model": "qwen-7b",
  "messages": [
    {
      "role": "user",
      "content": "你好，介绍一下人工智能"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}'`,I=`import requests

url = "https://api.example.com/api/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "model": "qwen-7b",
    "messages": [
        {
            "role": "user",
            "content": "你好，介绍一下人工智能"
        }
    ],
    "temperature": 0.7,
    "max_tokens": 1024
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,f=`const url = "https://api.example.com/api/v1/chat/completions";
const headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_API_KEY"
};
const data = {
  "model": "qwen-7b",
  "messages": [
    {
      "role": "user",
      "content": "你好，介绍一下人工智能"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
};

fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,T=`{
  "id": "chatcmpl-123456",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "qwen-7b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "人工智能（Artificial Intelligence，简称AI）是计算机科学的一个分支，它试图理解智能的本质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器。"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 85,
    "total_tokens": 100
  }
}`;return e.jsx("div",{style:{padding:"24px"},children:e.jsxs(r,{children:[e.jsxs(t,{level:2,children:[e.jsx(C,{})," HTTP API 调用示例"]}),e.jsx(n,{children:"本文档介绍了如何通过 HTTP API 调用大模型服务与应用开发平台提供的各项功能。"}),e.jsx(m,{}),e.jsxs(S,{direction:"vertical",style:{width:"100%"},children:[e.jsx(t,{level:3,children:"认证方式"}),e.jsx(n,{children:"所有 API 请求都需要在 HTTP Header 中包含认证信息："}),e.jsxs(r,{size:"small",children:[e.jsxs(n,{style:{fontFamily:"monospace"},children:["Authorization: Bearer ","<","YOUR_API_KEY",">"]}),e.jsx(d,{type:"primary",icon:s==="auth-header"?e.jsx(c,{}):e.jsx(p,{}),onClick:()=>l("Authorization: Bearer <YOUR_API_KEY>","auth-header"),size:"small",children:s==="auth-header"?"已复制":"复制"})]}),e.jsx(t,{level:3,children:"基础URL"}),e.jsxs(r,{size:"small",children:[e.jsx(n,{style:{fontFamily:"monospace"},children:"https://api.example.com"}),e.jsx(d,{type:"primary",icon:s==="base-url"?e.jsx(c,{}):e.jsx(p,{}),onClick:()=>l("https://api.example.com","base-url"),size:"small",children:s==="base-url"?"已复制":"复制"})]}),e.jsx(t,{level:3,children:"API 端点"}),e.jsx(y,{dataSource:w,columns:[{title:"名称",dataIndex:"name",key:"name"},{title:"方法",dataIndex:"method",key:"method",render:a=>e.jsx(R,{color:a==="GET"?"green":"blue",children:a})},{title:"路径",dataIndex:"path",key:"path",render:a=>e.jsx(o,{code:!0,children:a})},{title:"描述",dataIndex:"description",key:"description"}],pagination:!1,rowKey:"id"}),e.jsx(m,{}),e.jsx(t,{level:3,children:"Chat Completion API"}),e.jsx(n,{children:"与大语言模型进行对话交互，生成自然语言响应。"}),e.jsxs(P,{defaultActiveKey:"1",children:[e.jsx(x,{tab:"请求参数",children:e.jsx(y,{dataSource:k,columns:[{title:"参数名",dataIndex:"name",key:"name",render:(a,j)=>e.jsxs(o,{strong:!0,children:[a," ",j.required&&e.jsx(o,{type:"danger",children:"*"})]})},{title:"类型",dataIndex:"type",key:"type"},{title:"描述",dataIndex:"description",key:"description"}],pagination:!1,rowKey:"name"})},"1"),e.jsx(x,{tab:"响应参数",children:e.jsx(y,{dataSource:A,columns:[{title:"参数名",dataIndex:"name",key:"name"},{title:"类型",dataIndex:"type",key:"type"},{title:"描述",dataIndex:"description",key:"description"}],pagination:!1,rowKey:"name"})},"2"),e.jsx(x,{tab:"请求示例",children:e.jsxs(u,{defaultActiveKey:["1"],children:[e.jsx(h,{header:"cURL 示例",children:e.jsxs(r,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:g}),e.jsx(d,{type:"primary",icon:s==="curl-example"?e.jsx(c,{}):e.jsx(p,{}),onClick:()=>l(g,"curl-example"),children:s==="curl-example"?"已复制":"复制代码"})]})},"1"),e.jsx(h,{header:"Python 示例",children:e.jsxs(r,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:I}),e.jsx(d,{type:"primary",icon:s==="python-example"?e.jsx(c,{}):e.jsx(p,{}),onClick:()=>l(I,"python-example"),children:s==="python-example"?"已复制":"复制代码"})]})},"2"),e.jsx(h,{header:"JavaScript 示例",children:e.jsxs(r,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:f}),e.jsx(d,{type:"primary",icon:s==="js-example"?e.jsx(c,{}):e.jsx(p,{}),onClick:()=>l(f,"js-example"),children:s==="js-example"?"已复制":"复制代码"})]})},"3")]})},"3"),e.jsx(x,{tab:"响应示例",children:e.jsxs(r,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:T}),e.jsx(d,{type:"primary",icon:s==="response-example"?e.jsx(c,{}):e.jsx(p,{}),onClick:()=>l(T,"response-example"),children:s==="response-example"?"已复制":"复制代码"})]})},"4")]}),e.jsx(m,{}),e.jsx(t,{level:3,children:"其他API示例"}),e.jsxs(u,{children:[e.jsx(h,{header:"获取模型列表",children:e.jsxs(r,{size:"small",children:[e.jsx(t,{level:5,children:"请求"}),e.jsxs(n,{children:[e.jsx(o,{strong:!0,children:"GET"})," /api/v1/models"]}),e.jsx(t,{level:5,children:"响应示例"}),e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap"},children:`{
  "object": "list",
  "data": [
    {
      "id": "qwen-7b",
      "object": "model",
      "created": 1677610602,
      "owned_by": "system"
    },
    {
      "id": "llama-2-13b",
      "object": "model",
      "created": 1677610602,
      "owned_by": "system"
    }
  ]
}`})]})},"1"),e.jsx(h,{header:"文本嵌入",children:e.jsxs(r,{size:"small",children:[e.jsx(t,{level:5,children:"请求"}),e.jsxs(n,{children:[e.jsx(o,{strong:!0,children:"POST"})," /api/v1/embeddings"]}),e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap"},children:`{
  "model": "text-embedding-ada-002",
  "input": "人工智能是计算机科学的一个分支"
}`}),e.jsx(t,{level:5,children:"响应示例"}),e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap"},children:`{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [
        0.0023064255,
        -0.009327292,
        -0.0028842222,
        // ... 1536个维度的向量
      ],
      "index": 0
    }
  ],
  "model": "text-embedding-ada-002",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}`})]})},"2")]}),e.jsx(m,{}),e.jsx(t,{level:3,children:"错误处理"}),e.jsx(n,{children:"API 使用 HTTP 状态码来表示请求的结果。以下是一些常见的错误状态码："}),e.jsxs(z,{gutter:16,children:[e.jsx(v,{span:12,children:e.jsx(r,{size:"small",children:e.jsxs(i,{column:1,size:"small",children:[e.jsx(i.Item,{label:"400 Bad Request",children:"请求参数错误或缺失必要参数"}),e.jsx(i.Item,{label:"401 Unauthorized",children:"缺少有效的 API 密钥或密钥无效"}),e.jsx(i.Item,{label:"404 Not Found",children:"请求的资源不存在"})]})})}),e.jsx(v,{span:12,children:e.jsx(r,{size:"small",children:e.jsxs(i,{column:1,size:"small",children:[e.jsx(i.Item,{label:"429 Too Many Requests",children:"请求过于频繁，超出速率限制"}),e.jsx(i.Item,{label:"500 Internal Server Error",children:"服务器内部错误"}),e.jsx(i.Item,{label:"503 Service Unavailable",children:"服务暂时不可用"})]})})})]}),e.jsx(m,{}),e.jsx(t,{level:3,children:"速率限制"}),e.jsx(n,{children:"为保证服务质量，API 对请求频率有一定限制："}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(o,{strong:!0,children:"免费用户："}),"每分钟最多 60 次请求"]}),e.jsxs("li",{children:[e.jsx(o,{strong:!0,children:"付费用户："}),"根据套餐不同，每分钟最多 1000-10000 次请求"]})]}),e.jsx(n,{children:"当超过速率限制时，API 将返回 429 状态码。建议在收到 429 响应时实施重试机制。"})]})]})})};export{W as default};
