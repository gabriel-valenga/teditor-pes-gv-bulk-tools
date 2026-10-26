# Detailed Overall formula

This document describes the formula implemented in the `PES GV — OVERALL CALCULATION` section of `main.js`. The implementation was reconstructed from the inspected TEditor JavaScript to reproduce its calculation; it is not an official formula published by Konami.

## Overview

For outfield players, the result depends on two scores: a position-specific score and a transformed general score. The weights vary by position. The final Overall has a minimum value of 40.

The code follows this flow:

1. Calculate the **position score** using the weights for the target position.
2. If the target position differs from the registered position and the player has `A` or `B` familiarity for it, apply the familiarity bonus and finish the calculation.
3. Otherwise, add the fixed adjustment for that position.
4. For outfield players, blend 60% of the adjusted position score with 40% of the transformed general score. For goalkeepers, use the adjusted position score without this blend.
5. Enforce the minimum value of 40.

## 1. Position score: what does each weight mean?

Each attribute has a **position-specific weight**. A weight is a coefficient used in the sum, not a direct percentage and not the number of points added to Overall. A larger weight means differences in that attribute have a greater effect on that position's position score.

For each regular attribute, the code uses the difference between the attribute value and 25, multiplied by the weight. `weakFootAccuracy` is the exception: it uses the value minus 1. In simplified notation:

```text
attribute contribution = (attribute value − baseline) × weight
baseline = 25 for regular attributes
baseline = 1 for weakFootAccuracy
position score = truncate((sum of contributions + 50) / 100)
```

The code sums contributions from the selected position's table. Attributes not listed in a position's table have weight zero for that position and therefore do not affect its position score. They may still affect the general score described in section 2.

### Weights by position

The tables list the non-zero weights in the code. The technical name in backticks is the key used in TEditor's player object.

### Goalkeeper (GK)
| Atributo | Peso |
|---|---:|
| Jump (`jump`) | 11 |
| Physical Contact (`physicalContact`) | 11 |
| GK Awareness (`gkAwareness`) | 50 |
| GK Reflexes (`gkReflexes`) | 48 |

For goalkeeper position scoring, `gkAwareness` weights the average of Awareness and Reach; `gkReflexes` weights the average of Catching, Clearing, and Reflexes.

### Centre Back (CB)
| Attribute | Weight |
|---|---:|
| Heading (`headingAbility`) | 22 |
| Speed (`speed`) | 10 |
| Jump (`jump`) | 19 |
| Physical Contact (`physicalContact`) | 19 |
| Stamina (`stamina`) | 9 |
| Defensive Prowess (`defensiveProwess`) | 25 |
| Ball Winning (`ballWinning`) | 17 |
| Aggression (`aggression`) | 8 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 23 |

### Left Back (LB)
| Attribute | Weight |
|---|---:|
| Attacking Prowess (`attackingProwess`) | 6 |
| Ball Control (`ballControl`) | 9 |
| Dribbling (`dribbling`) | 9 |
| Tight Possession (`tightPossession`) | 5 |
| Lofted Pass (`loftedPass`) | 14 |
| Speed (`speed`) | 16 |
| Acceleration (`acceleration`) | 14 |
| Jump (`jump`) | 11 |
| Physical Contact (`physicalContact`) | 8 |
| Balance (`balance`) | 4 |
| Stamina (`stamina`) | 14 |
| Defensive Prowess (`defensiveProwess`) | 14 |
| Ball Winning (`ballWinning`) | 8 |
| Aggression (`aggression`) | 5 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 56 |

### Right Back (RB)
| Attribute | Weight |
|---|---:|
| Attacking Prowess (`attackingProwess`) | 6 |
| Ball Control (`ballControl`) | 9 |
| Dribbling (`dribbling`) | 9 |
| Tight Possession (`tightPossession`) | 5 |
| Lofted Pass (`loftedPass`) | 14 |
| Speed (`speed`) | 16 |
| Acceleration (`acceleration`) | 14 |
| Jump (`jump`) | 11 |
| Physical Contact (`physicalContact`) | 8 |
| Balance (`balance`) | 4 |
| Stamina (`stamina`) | 14 |
| Defensive Prowess (`defensiveProwess`) | 14 |
| Ball Winning (`ballWinning`) | 8 |
| Aggression (`aggression`) | 5 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 56 |

### Defensive Midfielder (DMF)
| Attribute | Weight |
|---|---:|
| Attacking Prowess (`attackingProwess`) | 7 |
| Ball Control (`ballControl`) | 18 |
| Dribbling (`dribbling`) | 10 |
| Tight Possession (`tightPossession`) | 5 |
| Low Pass (`lowPass`) | 18 |
| Lofted Pass (`loftedPass`) | 19 |
| Curl (`curl`) | 12 |
| Speed (`speed`) | 3 |
| Acceleration (`acceleration`) | 3 |
| Jump (`jump`) | 5 |
| Physical Contact (`physicalContact`) | 9 |
| Balance (`balance`) | 4 |
| Stamina (`stamina`) | 14 |
| Defensive Prowess (`defensiveProwess`) | 7 |
| Ball Winning (`ballWinning`) | 3 |
| Aggression (`aggression`) | 1 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 23 |

### Central Midfielder (CMF)
| Attribute | Weight |
|---|---:|
| Attacking Prowess (`attackingProwess`) | 5 |
| Ball Control (`ballControl`) | 23 |
| Dribbling (`dribbling`) | 16 |
| Tight Possession (`tightPossession`) | 8 |
| Low Pass (`lowPass`) | 23 |
| Lofted Pass (`loftedPass`) | 21 |
| Speed (`speed`) | 4 |
| Acceleration (`acceleration`) | 6 |
| Physical Contact (`physicalContact`) | 3 |
| Balance (`balance`) | 2 |
| Stamina (`stamina`) | 17 |
| Defensive Prowess (`defensiveProwess`) | 3 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 23 |

### Left Midfielder (LMF)
| Attribute | Weight |
|---|---:|
| Attacking Prowess (`attackingProwess`) | 7 |
| Ball Control (`ballControl`) | 15 |
| Dribbling (`dribbling`) | 17 |
| Tight Possession (`tightPossession`) | 8 |
| Low Pass (`lowPass`) | 7 |
| Lofted Pass (`loftedPass`) | 12 |
| Curl (`curl`) | 4 |
| Speed (`speed`) | 24 |
| Acceleration (`acceleration`) | 21 |
| Stamina (`stamina`) | 13 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 56 |

### Right Midfielder (RMF)
| Attribute | Weight |
|---|---:|
| Attacking Prowess (`attackingProwess`) | 7 |
| Ball Control (`ballControl`) | 15 |
| Dribbling (`dribbling`) | 17 |
| Tight Possession (`tightPossession`) | 8 |
| Low Pass (`lowPass`) | 7 |
| Lofted Pass (`loftedPass`) | 12 |
| Curl (`curl`) | 4 |
| Speed (`speed`) | 24 |
| Acceleration (`acceleration`) | 21 |
| Stamina (`stamina`) | 13 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 56 |

### Attacking Midfielder (AMF)
| Attribute | Weight |
|---|---:|
| Attacking Prowess (`attackingProwess`) | 14 |
| Ball Control (`ballControl`) | 23 |
| Dribbling (`dribbling`) | 17 |
| Tight Possession (`tightPossession`) | 7 |
| Low Pass (`lowPass`) | 21 |
| Lofted Pass (`loftedPass`) | 14 |
| Finishing (`finishing`) | 17 |
| Speed (`speed`) | 5 |
| Acceleration (`acceleration`) | 7 |
| Physical Contact (`physicalContact`) | 2 |
| Balance (`balance`) | 3 |
| Stamina (`stamina`) | 3 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 37 |

### Left Wing Forward (LWF)
| Attribute | Weight |
|---|---:|
| Attacking Prowess (`attackingProwess`) | 17 |
| Ball Control (`ballControl`) | 19 |
| Dribbling (`dribbling`) | 15 |
| Tight Possession (`tightPossession`) | 7 |
| Low Pass (`lowPass`) | 5 |
| Lofted Pass (`loftedPass`) | 9 |
| Finishing (`finishing`) | 11 |
| Speed (`speed`) | 15 |
| Acceleration (`acceleration`) | 15 |
| Kicking Power (`kickingPower`) | 5 |
| Physical Contact (`physicalContact`) | 2 |
| Balance (`balance`) | 4 |
| Stamina (`stamina`) | 6 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 47 |

### Right Wing Forward (RWF)
| Attribute | Weight |
|---|---:|
| Attacking Prowess (`attackingProwess`) | 17 |
| Ball Control (`ballControl`) | 19 |
| Dribbling (`dribbling`) | 15 |
| Tight Possession (`tightPossession`) | 7 |
| Low Pass (`lowPass`) | 5 |
| Lofted Pass (`loftedPass`) | 9 |
| Finishing (`finishing`) | 11 |
| Speed (`speed`) | 15 |
| Acceleration (`acceleration`) | 15 |
| Kicking Power (`kickingPower`) | 5 |
| Physical Contact (`physicalContact`) | 2 |
| Balance (`balance`) | 4 |
| Stamina (`stamina`) | 6 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 47 |

### Second Striker (SS)
| Attribute | Weight |
|---|---:|
| Attacking Prowess (`attackingProwess`) | 15 |
| Ball Control (`ballControl`) | 19 |
| Dribbling (`dribbling`) | 13 |
| Tight Possession (`tightPossession`) | 6 |
| Low Pass (`lowPass`) | 9 |
| Lofted Pass (`loftedPass`) | 9 |
| Finishing (`finishing`) | 14 |
| Speed (`speed`) | 9 |
| Acceleration (`acceleration`) | 21 |
| Kicking Power (`kickingPower`) | 6 |
| Physical Contact (`physicalContact`) | 2 |
| Balance (`balance`) | 5 |
| Stamina (`stamina`) | 4 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 37 |

### Centre Forward (CF)
| Attribute | Weight |
|---|---:|
| Attacking Prowess (`attackingProwess`) | 31 |
| Ball Control (`ballControl`) | 23 |
| Dribbling (`dribbling`) | 9 |
| Tight Possession (`tightPossession`) | 5 |
| Finishing (`finishing`) | 36 |
| Heading (`headingAbility`) | 3 |
| Speed (`speed`) | 5 |
| Acceleration (`acceleration`) | 5 |
| Kicking Power (`kickingPower`) | 3 |
| Jump (`jump`) | 3 |
| Physical Contact (`physicalContact`) | 8 |
| Balance (`balance`) | 2 |
| Weak Foot Accuracy (`weakFootAccuracy`) | 38 |

## 2. General score

The general score is calculated separately from the position score. The code sums these 22 values:

- The 20 general attributes listed in `OVERALL_ATTRIBUTES`, **excluding** `weakFootAccuracy`.
- The integer average of `gkAwareness` and `gkReach`.
- The integer average of `gkCatching`, `gkClearing`, and `gkReflexes`.

The goalkeeper-attribute averages are truncated to integers. The sum is then divided by 22 and rounded to the nearest integer using the code's integer arithmetic:

```text
awareness/reach average = truncate((gkAwareness + gkReach) / 2)
catching/clearing/reflexes average = truncate((gkCatching + gkClearing + gkReflexes) / 3)
general score = truncate((truncate(sum of 22 values × 100 / 22) + 50) / 100)
```

### General-score transformation

The raw result is not used directly. The code applies the following adjustment:

| General score before adjustment | Amount added to general score |
|---:|---:|
| 61 or lower | −9 |
| 62 | −6 |
| 63 | −4 |
| 64 | −2 |
| 65 | 0 |
| 66 | +1 |
| 67 | +3 |
| 68 | +5 |
| 69 | +6 |
| 70 | +7 |
| 71 | +8 |
| 72–73 | +10 |
| 74–75 | +12 |
| 76–77 | +13 |
| 78 or higher | +14 |

Example: if the general score is 70, the transformed score is 77 (70 + 7). Thresholds are evaluated in ascending order, as in `transformGeneralScore`.

## 3. Adjustments and final calculation

### Fixed position adjustment

When the `A`/`B` familiarity bonus is not applied, the code adds the following fixed adjustment to the position score:

| Position | Fixed adjustment |
|---|---:|
| GK | +8 |
| CB | +8 |
| LB, RB, DMF | +9 |
| CMF, LMF, RMF, AMF | +8 |
| LWF, RWF | +10 |
| SS | +9 |
| CF | +8 |

### Familiarity bonus for a position other than the registered position

If the target position differs from the registered position, the code checks that position's familiarity field. If it is `A` or `B`, the calculation ends with the position score plus the bonus below. In this path, the fixed adjustment and the 60/40 blend are **not** applied.

| Target position | Familiarity A | Familiarity B |
|---|---:|---:|
| GK | +5 | +3 |
| CB | +5 | +3 |
| LB | +4 | +2 |
| RB | +4 | +2 |
| DMF | +4 | +2 |
| CMF | +5 | +3 |
| LMF | +5 | +3 |
| RMF | +5 | +3 |
| AMF | +5 | +3 |
| LWF | +4 | +2 |
| RWF | +4 | +2 |
| SS | +5 | +3 |
| CF | +5 | +3 |

If no `A`/`B` bonus applies, the normal fixed-adjustment path is used.

### Outfield players

For an outfield position, after the fixed adjustment, Overall is calculated as follows:

```text
adjusted score = position score + fixed position adjustment
Overall = truncate((adjusted score × 60 + transformed general score × 40 + 50) / 100)
```

This is approximately 60% of the adjusted position score and 40% of the transformed general score, with the integer rounding reproduced from the code.

### Goalkeepers

For `GK`, after the +8 fixed adjustment, the adjusted position score is the result. The code does not blend it with the transformed general score.

### Minimum value

In the normal calculation paths, the final result is `max(result, 40)`. Therefore, the calculated Overall cannot be below 40. This code section does not apply an explicit maximum cap of 100.

## 4. Illustrative example of weighting

Imagine two players with the same target position and identical values for every attribute except Speed. For a `CF`, Speed has weight 5; for an `LMF`, Speed has weight 24. The same Speed difference therefore creates a larger position-score contribution for an `LMF` than for a `CF`. This **does not** mean that increasing Speed by 1 point raises final Overall by 24 points: the weight is part of a sum scaled by 100, followed by rounding and, for outfield players, the 60/40 blend.

## 5. Fields used

- General attributes used in the position score: `attackingProwess`, `ballControl`, `dribbling`, `tightPossession`, `lowPass`, `loftedPass`, `finishing`, `headingAbility`, `placeKicking`, `curl`, `speed`, `acceleration`, `kickingPower`, `jump`, `physicalContact`, `balance`, `stamina`, `defensiveProwess`, `ballWinning`, `aggression`, and `weakFootAccuracy`.
- Goalkeeper attributes: `gkAwareness`, `gkReach`, `gkCatching`, `gkClearing`, and `gkReflexes`.
- Familiarity is read from a field specific to the target position, such as `positionCb`, `positionDmf`, or `positionCf`.

If a required numeric field is missing or cannot be converted to a number, the implementation returns `null` for the calculation instead of inventing an Overall.

## 6. Relationship to reputation

When **Reputation by Overall** is enabled, PES GV calculates Overall from the attributes resulting from the planned changes, then uses that Overall to determine the user-configured reputation band. Reputation does not participate in the Overall calculation; it is a separate value derived from it.

## Maintenance notes

- The weights and rules above reflect the current `main.js` implementation. If TEditor's code changes, review and compare this documentation again.
- Integer rounding/truncation is part of the formula; replacing it with a simple decimal average may produce different results.
- This document describes the behavior reproduced by this project; it does not claim that every PES game or editor uses the same formula.
