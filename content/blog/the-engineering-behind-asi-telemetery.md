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
flowchart TB
    A["Fetch.ai Ecosystem"]

    A --> B["uAgents"]
    A --> C["Agentverse"]
    A --> D["ASI:One"]
    A --> E["ASI:Telemetry"]

    B --> B1["Build AI Agents"]
    C --> C1["Host & Discover Agents"]
    D --> D1["Interact with AI Agents"]
    E --> E1["Monitor & Observe Agents"]

    B1 --> F["Autonomous AI Agents"]
    C1 --> F
    D1 --> F

    F --> E1

    E1 --> G["Distributed Tracing"]
    E1 --> H["Performance Metrics"]
    E1 --> I["Error Tracking"]
    E1 --> J["LLM Cost Analytics"]

    classDef ecosystem fill:#172554,stroke:#3b82f6,color:#fff
    classDef telemetry fill:#064e3b,stroke:#10b981,color:#fff
    class A,B,C,D ecosystem
    class E,E1,G,H,I,J telemetry
```

## How SDK Collect traces ? 
