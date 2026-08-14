from pathlib import Path

import pandas as pd

DATA_PATH = Path(__file__).parent / "data" / "pcos_dataset.csv"

# Bin edges for pd.cut, paired with right=False (left-closed, right-open intervals):
# [18,25) [25,30) [30,35) [35,40) [40,46) — the trailing 46 (not 45) is what makes the
# last bin actually include age 45 itself. Ages in this dataset are whole years, so
# this cleanly reproduces the 5 requested brackets with no edge-case gaps or overlaps.
AGE_BIN_EDGES = [18, 25, 30, 35, 40, 46]
AGE_BRACKET_LABELS = ["18-24", "25-29", "30-34", "35-39", "40-45"]

_df = pd.read_csv(DATA_PATH)


def get_age_distribution() -> list[dict]:
    """Count of PCOS_Diagnosis==1 cases per age bracket, in bracket order."""
    diagnosed = _df[_df["PCOS_Diagnosis"] == 1]

    brackets = pd.cut(
        diagnosed["Age"],
        bins=AGE_BIN_EDGES,
        labels=AGE_BRACKET_LABELS,
        right=False,
    )

    counts = brackets.value_counts().reindex(AGE_BRACKET_LABELS, fill_value=0)

    return [
        {"bracket": label, "count": int(count)}
        for label, count in counts.items()
    ]
