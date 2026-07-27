================================================================================
          FIN_DOC = AI FINANCIAL DOCTOR: ARCHITECTURAL & ALGORITHMIC ENGINE
================================================================================

1. CORE ARCHITECTURAL PHILOSOPHY
--------------------------------------------------------------------------------
The fundamental failure of naive AI applications in finance is using Large 
Language Models (LLMs) to perform arithmetic or aggregate raw data. LLMs are 
probabilistic next-token predictors and are prone to numerical hallucination.

The AI Financial Doctor operates on a strict "Separation of Concerns" pattern:
┌────────────────────────────────────────────────────────────────────────────┐
│  Layer 1: Data Ingestion & Normalization (Deterministic)                   │
│  Layer 2: SQL / Algebraic Math Engine (Deterministic & Absolute Precision) │
│  Layer 3: Heuristic & Predictive Risk Scoring (Deterministic Algorithms)   │
│  Layer 4: LLM Interpretation & Action Generation (Probabilistic NLP)       │
└────────────────────────────────────────────────────────────────────────────┘

Rule #1: The LLM is never given raw transaction lists to sum or calculate.
Rule #2: The LLM receives pre-calculated, verified JSON metrics and translates
         them into human-readable alerts and actionable workflows.


2. DATA DOMAIN MODEL (DYNAMIC ENTITY SCHEMAS)
--------------------------------------------------------------------------------
To analyze financial health dynamically across varying business types, the system 
abstracts all financial events into four core entities:

A. ACCOUNTS (Cash Sources & Sinks)
   - ID, User_ID, Provider (Stripe, Plaid, Bank), Balance, Currency, Updated_At

B. TRANSACTIONS (Historical Events)
   - ID, Account_ID, Amount (+ for inflows, - for outflows), Timestamp,
     Raw_Description, Cleaned_Category, Is_Recurring (Boolean)

C. INVOICES / RECEIVABLES (Expected Inflows)
   - ID, Client_ID, Amount, Due_Date, Status (Pending, Paid, Overdue),
     Client_Historical_Delay_Days (Moving average of how late this client pays)

D. RECURRING OBLIGATIONS / PAYABLES (Expected Outflows)
   - ID, Vendor_Name, Expected_Amount, Frequency (Daily, Weekly, Monthly),
     Next_Due_Date, Category (Payroll, Rent, SaaS, Supplier)


3. MATHEMATICAL & PREDICTIVE ENGINE (THE MATH CORE)
--------------------------------------------------------------------------------
The Math Engine projects daily liquidity over a rolling timeline (e.g., T = 30 days).

A. Effective Due Date Adjustment (Probabilistic Receivables):
   Instead of assuming an invoice is paid on its formal Due_Date (D), we adjust
   it using the Client's Historical Payment Lag (L_avg):
   
   Adjusted_Due_Date = Due_Date + L_avg

B. Daily Cash Balance Projection Formula:
   For any future day 't' (where t ranges from 1 to N days into the future):

   Net_Inflow(t)  = SUM(Invoices where Adjusted_Due_Date == t)
   Net_Outflow(t) = SUM(Recurring_Obligations where Next_Due_Date == t)
   
   Projected_Cash(t) = Projected_Cash(t - 1) + Net_Inflow(t) - Net_Outflow(t)
   
   Where Projected_Cash(0) = Current_Real_Bank_Balance


C. Deficit & Payroll Risk Detection:
   Let Threshold_Safety = Minimum_Required_Buffer (e.g., 1x Next_Payroll_Amount)

   Trigger_Risk = TRUE if ANY(Projected_Cash(t) < Threshold_Safety) for t in [1, N]
   Days_To_Crunch = MIN(t) where Projected_Cash(t) < Threshold_Safety


D. Dynamic Anomaly / Profit Leak Detection (Statistical Z-Score):
   To detect quiet price increases in vendor subscriptions without hardcoding names:

   Let X_vendor = Array of historical monthly charges for Vendor_V over past M months
   Mean (μ) = Average(X_vendor)
   StdDev (σ) = StandardDeviation(X_vendor)

   If Current_Charge > μ + (K * σ)   [where K is typically 2.0]
   THEN Flag_Anomaly(Vendor_V, Price_Increase_Percentage)


4. ALGORITHMIC WORKFLOW & DATA PIPELINE
--------------------------------------------------------------------------------

[Step 1: Automated Sync]
  ├── Ingest raw API pay-loads from Bank/Processor webhooks
  └── Categorize using vector embeddings or regex pattern matching

[Step 2: Deterministic Calculation Loop]
  ├── Compute Current_Cash_Balance
  ├── Run rolling 30-day Projected_Cash(t) simulation
  ├── Evaluate Risk Rules:
  │     ├── Rule 1: Is Projected_Cash(t) < 0 or < Safety_Threshold?
  │     ├── Rule 2: Are overdue invoices > 10% of total cash?
  │     └── Rule 3: Are any vendor costs deviating from historical baseline?
  └── Construct Structured Risk Payload (JSON)

[Step 3: Structured Payload Construction (Example Schema)]
  {
    "account_id": "acc_8819",
    "current_balance": 11000.00,
    "risk_flagged": true,
    "risk_type": "PAYROLL_SHORTFALL",
    "days_until_deficit": 7,
    "deficit_amount": 6500.00,
    "contributing_factors": {
      "upcoming_payroll": {"date": "2026-08-03", "amount": 17500.00},
      "overdue_invoices": [
        {"client": "Acme Corp", "amount": 5000.00, "days_overdue": 12},
        {"client": "Stark Ind", "amount": 3000.00, "days_overdue": 5}
      ]
    }
  }

[Step 4: LLM Narrative Generation & Action Dispatch]
  ├── Pass JSON Payload + Strict System Prompt to Fast LLM (e.g. gpt-4o-mini / Llama-3)
  ├── LLM generates:
  │     1. Human Summary (WhatsApp/SMS ready)
  │     2. Pre-drafted action step (e.g., direct email template to late clients)
  └── Trigger Notification Webhook (Twilio / WhatsApp API) to User


5. THE PROMPT PATTERN (ISOLATING MATH FROM LANGUAGE)
--------------------------------------------------------------------------------
System Prompt Example:
"You are an executive AI Financial Controller. You are provided with pre-calculated,
100% accurate financial metrics in JSON format. Do NOT re-calculate any numbers.
Do NOT modify monetary amounts. Your task is to:
1. Explain the risk clearly in under 30 words.
2. Provide a 1-click action recommendation.
3. Draft a polite, professional payment reminder for the late client listed in 
   the payload."

Output Format Required:
{
  "alert_headline": "...",
  "explanation": "...",
  "recommended_action": "...",
  "draft_client_message": "..."
}


6. WHY THIS WORKS IN THE REAL WORLD
--------------------------------------------------------------------------------
1. Zero Hallucination: The LLM never computes totals, so it cannot miscalculate.
2. Passive Background Execution: Cron jobs run the math loop automatically every
   midnight or upon incoming webhooks, requiring 0 manual user interaction.
3. Action-Oriented: Converts passive financial data into automated communication
   workflows (like sending payment reminders with pre-filled payment links).
================================================================================