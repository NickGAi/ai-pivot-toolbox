import os
from anthropic import Anthropic

def run_geo_optimization():
    client = Anthropic(
        api_key=os.environ.get("ANTHROPIC_API_KEY")
    )

    user_prompt = """
You are an expert in Generative Engine Optimization (GEO).
Analyze this website and suggest GEO-optimized content improvements.

<site>
https://aipivot.com.au
</site>

<business_context>
AiPivot is an AI Automation & Business Transformation Agency based in Australia.
Services include:
- Data entry automation
- Invoicing and billing automation
- AI-powered lead nurturing
- AI voice agents for customer service
- Enterprise AI infrastructure
- Compliance-ready AI solutions
- Custom AI automation implementation

Target audience: Operations Directors, CFOs, Heads of Customer Service, Business Transformation Leaders, Enterprise CIOs
Competitors: K2X, DigitUX, SELR AI, FUZN, AI Business Automation Australia
</business_context>

Return:
- Top 5 GEO-optimized title ideas
- 3 meta description options
- 5 FAQ-style Q&As for enterprise decision-makers
- 5 high-value keywords to target
- Content recommendations for AI search visibility
    """.strip()

    message = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        max_tokens=2000,
        messages=[
            {
                "role": "user",
                "content": user_prompt,
            }
        ],
    )

    geo_report = "".join(
        block.text for block in message.content if getattr(block, "type", None) == "text"
    )
    print(geo_report)


if __name__ == "__main__":
    run_geo_optimization()
