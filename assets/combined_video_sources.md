# Combined Video Sources

## 1. Video_LLM_Mismatch_Examples_Selected12.mp4
- Output: `/workspace/Video_LLM_Mismatch_Examples_Selected12.mp4`

| Sample | Source Path |
|---|---|
| `the red Alfa sports car is speeding down the road.mp4` | `/workspace/ltx_blur_no_prompt_results/the red Alfa sports car is speeding down the road.mp4` |
| `two men in white clothing standing next to each other.mp4` | `/workspace/vbench_i2vguard/two men in white clothing standing next to each other.mp4` |
| `the otter is standing in the water.mp4` | `/workspace/mid50_w_prompt_jpeg3/the otter is standing in the water.mp4` |
| `two men riding bikes down a road near a forest.mp4` | `/workspace/ltx_i2v_guard_no_prompt_results/two men riding bikes down a road near a forest.mp4` |
| `a woman stirring food in a pan on the stove.mp4` | `/workspace/ltx_i2v_guard_no_prompt_results/a woman stirring food in a pan on the stove.mp4` |
| `fireworks in the night sky over a city.mp4` | `/workspace/vbench_i2vguard/fireworks in the night sky over a city.mp4` |
| `a man standing on top of a sand dune in the desert.mp4` | `/workspace/vbench_i2vguard/a man standing on top of a sand dune in the desert.mp4` |
| `a person jumping in the air over a fence.mp4` | `/workspace/ltx_ours_advclean/a person jumping in the air over a fence.mp4` |
| `a space shuttle taking off into the sky.mp4` | `/workspace/vbench_i2vguard/a space shuttle taking off into the sky.mp4` |
| `a large crowd of people walking in a shopping mall.mp4` | `/workspace/cog_to_ltx_ours/a large crowd of people walking in a shopping mall.mp4` |
| `a frog sitting on top of water lily leaves.mp4` | `/workspace/cog_to_ltx_i2vguard/a frog sitting on top of water lily leaves.mp4` |
| `a snow covered street.mp4` | `/workspace/mid50_w_prompt/a snow covered street.mp4` |

## 2. Additional_Qualitative_Results_CogVideoX.mp4
- Output: `/workspace/Additional_Qualitative_Results_CogVideoX.mp4`

### White-box

| Prompt | Clean | I2VGuard | Ours |
|---|---|---|---|
| `a woman with long black hair is posing for a picture` | `/workspace/coggen_results/a woman with long black hair is posing for a picture.mp4` | `/workspace/vbench_i2vguard/a woman with long black hair is posing for a picture.mp4` | `/workspace/mid50_w_prompt/a woman with long black hair is posing for a picture.mp4` |
| `a man standing on a boat with a net` | `/workspace/coggen_results/a man standing on a boat with a net.mp4` | `/workspace/vbench_i2vguard/a man standing on a boat with a net.mp4` | `/workspace/mid50_w_prompt/a man standing on a boat with a net.mp4` |
| `a man holding a tray in front of a brick wall` | `/workspace/coggen_results/a man holding a tray in front of a brick wall.mp4` | `/workspace/vbench_i2vguard/a man holding a tray in front of a brick wall.mp4` | `/workspace/mid50_w_prompt/a man holding a tray in front of a brick wall.mp4` |
| `an aerial view of a busy city with a bridge in the background` | `/workspace/coggen_results/an aerial view of a busy city with a bridge in the background.mp4` | `/workspace/vbench_i2vguard/an aerial view of a busy city with a bridge in the background.mp4` | `/workspace/mid50_w_prompt/an aerial view of a busy city with a bridge in the background.mp4` |
| `a woman with green hair smiling for the camera` | `/workspace/coggen_results/a woman with green hair smiling for the camera.mp4` | `/workspace/vbench_i2vguard/a woman with green hair smiling for the camera.mp4` | `/workspace/mid50_w_prompt/a woman with green hair smiling for the camera.mp4` |

### Black-box

| Prompt | Clean | I2VGuard | Ours |
|---|---|---|---|
| `the great wall of china in autumn` | `/workspace/coggen_results/the great wall of china in autumn.mp4` | `/workspace/ltx_i2v_guard_no_prompt_results/the great wall of china in autumn.mp4` | `/workspace/ltx_blur_no_prompt_results/the great wall of china in autumn.mp4` |
| `a man in sunglasses laying on a wooden bench` | `/workspace/coggen_results/a man in sunglasses laying on a wooden bench.mp4` | `/workspace/ltx_i2v_guard_no_prompt_results/a man in sunglasses laying on a wooden bench.mp4` | `/workspace/ltx_blur_no_prompt_results/a man in sunglasses laying on a wooden bench.mp4` |

### Crop and Resize

| Prompt | Clean | I2VGuard | Ours |
|---|---|---|---|
| `a white and blue airplane flying in the sky` | `/workspace/coggen_results/a white and blue airplane flying in the sky.mp4` | `/workspace/cog_i2v_cropresize/a white and blue airplane flying in the sky.mp4` | `/workspace/cog_ours_cropresize/a white and blue airplane flying in the sky.mp4` |

### JPEG

| Prompt | Clean | I2VGuard | Ours |
|---|---|---|---|
| `a living room filled with lots of books on a wall` | `/workspace/coggen_results/a living room filled with lots of books on a wall.mp4` | `/workspace/i2v_guard_gen_no_per_yes_jpeg2/a living room filled with lots of books on a wall.mp4` | `/workspace/mid50_w_prompt_jpeg3/a living room filled with lots of books on a wall.mp4` |

### ADVClean

| Prompt | Clean | I2VGuard | Ours |
|---|---|---|---|
| `a man in a hat sitting in front of a brick oven` | `/workspace/coggen_results/a man in a hat sitting in front of a brick oven.mp4` | `/workspace/i2v_guard_gen_no_per_yes_advclean2/a man in a hat sitting in front of a brick oven.mp4` | `/workspace/mid50_w_prompt_advclean2/a man in a hat sitting in front of a brick oven.mp4` |

## 3. Additional_Qualitative_Results_LTX-Video.mp4
- Output: `/workspace/Additional_Qualitative_Results_LTX-Video.mp4`

### White-box

| Prompt | Clean | I2VGuard | Ours |
|---|---|---|---|
| `two women eating pizza at a restaurant` | `/workspace/ltx_clean/two women eating pizza at a restaurant.mp4` | `/workspace/ltx_i2v_results/two women eating pizza at a restaurant.mp4` | `/workspace/ltx_ours_results/two women eating pizza at a restaurant.mp4` |
| `a group of people in a yellow raft is rowing through turbulent waters` | `/workspace/ltx_clean/a group of people in a yellow raft is rowing through turbulent waters.mp4` | `/workspace/ltx_i2v_results/a group of people in a yellow raft is rowing through turbulent waters.mp4` | `/workspace/ltx_ours_results/a group of people in a yellow raft is rowing through turbulent waters.mp4` |
| `a chef is preparing a dish with mushrooms on a wooden board` | `/workspace/ltx_clean/a chef is preparing a dish with mushrooms on a wooden board.mp4` | `/workspace/ltx_i2v_results/a chef is preparing a dish with mushrooms on a wooden board.mp4` | `/workspace/ltx_ours_results/a chef is preparing a dish with mushrooms on a wooden board.mp4` |
| `the pyramids of giza, egypt` | `/workspace/ltx_clean/the pyramids of giza, egypt.mp4` | `/workspace/ltx_i2v_results/the pyramids of giza, egypt.mp4` | `/workspace/ltx_ours_results/the pyramids of giza, egypt.mp4` |
| `a table with lobsters and drinks on it` | `/workspace/ltx_clean/a table with lobsters and drinks on it.mp4` | `/workspace/ltx_i2v_results/a table with lobsters and drinks on it.mp4` | `/workspace/ltx_ours_results/a table with lobsters and drinks on it.mp4` |

### Black-box

| Prompt | Clean | I2VGuard | Ours |
|---|---|---|---|
| `a man with a skull face paint smoking a cigar and holding a guitar` | `/workspace/ltx_clean/a man with a skull face paint smoking a cigar and holding a guitar.mp4` | `/workspace/cog_to_ltx_i2vguard/a man with a skull face paint smoking a cigar and holding a guitar.mp4` | `/workspace/cog_to_ltx_ours/a man with a skull face paint smoking a cigar and holding a guitar.mp4` |
| `a table and chairs in a room with a plant in the corner` | `/workspace/ltx_clean/a table and chairs in a room with a plant in the corner.mp4` | `/workspace/cog_to_ltx_i2vguard/a table and chairs in a room with a plant in the corner.mp4` | `/workspace/cog_to_ltx_ours/a table and chairs in a room with a plant in the corner.mp4` |

### Crop and Resize

| Prompt | Clean | I2VGuard | Ours |
|---|---|---|---|
| `an old man standing in the middle of a field holding a bunch of plants` | `/workspace/ltx_clean/an old man standing in the middle of a field holding a bunch of plants.mp4` | `/workspace/ltx_i2v_cropresize/an old man standing in the middle of a field holding a bunch of plants.mp4` | `/workspace/ltx_ours_cropresize/an old man standing in the middle of a field holding a bunch of plants.mp4` |

### JPEG

| Prompt | Clean | I2VGuard | Ours |
|---|---|---|---|
| `a woman is praying in front of a buddhist temple` | `/workspace/ltx_clean/a woman is praying in front of a buddhist temple.mp4` | `/workspace/ltx_i2v_jpeg/a woman is praying in front of a buddhist temple.mp4` | `/workspace/ltx_ours_jpeg/a woman is praying in front of a buddhist temple.mp4` |

### ADVClean

| Prompt | Clean | I2VGuard | Ours |
|---|---|---|---|
| `a man in a mexican outfit holding an acoustic guitar` | `/workspace/ltx_clean/a man in a mexican outfit holding an acoustic guitar.mp4` | `/workspace/ltx_i2v_advclean/a man in a mexican outfit holding an acoustic guitar.mp4` | `/workspace/ltx_ours_advclean/a man in a mexican outfit holding an acoustic guitar.mp4` |
