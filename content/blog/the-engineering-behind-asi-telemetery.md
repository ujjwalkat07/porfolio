---
title: "The Engineering behind ASI Telemetery"
category: "Engineering"
description: "ASI:Telemetry is an Observability and monitoring platform for AI agents and ai applications."
date: "Oct 21, 2026"
lastModified: "Oct 21, 2026"
readTime: "5 min read"
tags: ["Engineering"]
keywords: [""]
link: "https://ujjwalkatiyar.in/blog/the-engineering-behind-asi-telemetery"
---

![alt text](/asi.png)

## Introduction
The idea of [ASI:Telemetry](https://asi-telemetry.vercel.app/) came to me when I was exploring and building AI agents using [uagents](https://uagents.fetch.ai/) library developed by [Fetch.ai](http://fetch.ai/).

I noticed **Fetch.ai** has [ASI:One](https://asi1.ai/) (An AI Assistant similar to ChatGPT & Claude, but here you can call your agent direclty by giving a prompt) and [Agentverse](https://agentverse.ai/) (A marketplace for AI agents where you can host your agents).

While exploring their products, I noticed one thing missing from their ecosystem: a tool for monitoring agents built with the uagent library. So, I built it: **ASI:Telemetry**, an Observability and monitoring platform for AI agents where developers can track agent performance, LLM cost, token usage, communication between multiple agents, and more, directly by installing our [SDK](https://pypi.org/project/asi-telemetry/).

```code
pip install asi:telemetry
```

## Architectural Design Of ASI:Telemetry

```mermaid

%%{init: {"themeVariables": {"fontSize": "12px"}, "flowchart": {"nodeSpacing": 18, "rankSpacing": 25, "padding": 5}}}%%

flowchart TD
    A["AI Agent / AI Application"]
    B["ASI:Telemetry SDK"]
    C["FastAPI Backend"]
    D["Processing & Validation"]
    E[("ClickHouse Database")]
    G["ASI:Telemetry Dashboard"]

    A -->|"Execution events, LLM calls,<br/>requests & responses"| B

    B -->|"Collect traces, metrics,<br/>tokens, latency & costs"| B
    B -->|"Export events<br/>via Async HTTP"| C

    C -->|"Receive telemetry payloads"| D
    D -->|"Stored traces, metrics<br/>& event records"| E
    E -->|"Query & aggregate<br/>monitoring data"| G

    style A fill:#172554,stroke:#3b82f6,color:#fff
    style B fill:#164e63,stroke:#06b6d4,color:#fff
    style C fill:#312e81,stroke:#818cf8,color:#fff
    style D fill:#312e81,stroke:#818cf8,color:#fff
    style E fill:#064e3b,stroke:#10b981,color:#fff
    style G fill:#064e3b,stroke:#10b981,color:#fff

```

## How SDK Collect traces ? 
