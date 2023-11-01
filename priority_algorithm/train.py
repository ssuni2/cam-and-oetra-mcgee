import pandas as pd
import nltk
import pickle

df = pd.read_csv('proc_email.csv')

df = df.head(1000)
print(df)




def extract_features(text):
    features = {}
    for word in nltk.word_tokenize(text):
        features[word] = True
    return features

featuresets = [(extract_features(text), label) for (text, label) in data]

train_set, test_set = featuresets[:800], featuresets[800:]

classifier = nltk.NaiveBayesClassifier.train(train_set)

accuracy = nltk.classify.accuracy(classifier, test_set)
print('Accuracy:', accuracy)

with open('my_classifier.pickle', 'wb') as f:
    pickle.dump(classifier, f)