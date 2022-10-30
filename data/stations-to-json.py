import pandas as pd

# read csv file
df = pd.read_csv('dataset/circuit-electrique/liste-complete-des-bornes-accents.csv')

# print first 5 rows
print(df.head())

# save to json file
df.to_json('dataset/circuit-electrique/liste-complete-des-bornes-accents.json', orient='records', force_ascii=False)
