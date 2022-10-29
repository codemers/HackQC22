import pandas as pd

# Demande électrique
# df = pd.read_json('dataset/hydro-qc/demande.json')
# # get details
# df = df['details']
# # flatten
# df = pd.json_normalize(df)
# df.to_csv('dataset/hydro-qc/demande.csv', index=False)


# Événements québec
df = pd.read_json('dataset/evenements/evenements-quebec.json')
# get idees de sortie
df = df['IDEES_SORTIE']['IDEE_SORTIE']
# flatten
df = pd.json_normalize(df)
df.to_csv('dataset/evenements/evenements-quebec.csv', index=False)

# Événements sherbrooke
df = pd.read_json('dataset/evenements/evenements-sherbrooke.json')
